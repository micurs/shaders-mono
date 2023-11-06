import { Point, Transform, UnitVector } from '@shaders-mono/geopro';

import * as fps from './internal/fps';
import { GPUConnection, GPUPipeline, GpuTransformations, Shaders, TransCbs, MouseCbs, Scene, DirectionalLight, PointLight } from './types';
import { setupShaderModule } from './internal/setup-shaders';
import { createPipelines } from './internal/setup-pipeline';
import { initMouseHandler } from './internal/mouse-capture';
import { buildRenderPassDescriptor, connectGPU, getTransformations, isPredefinedShader } from './internal/utils';

import shader3D from './internal/shader3d.wgsl?raw';
import shader2D from './internal/shader2d.wgsl?raw';
import { initRebuildViewTexture } from './internal/resize-render-target';

type PipelineMode = 'default' | 'alternative';
export class Gpu implements GPUConnection {
  readonly canvas: HTMLCanvasElement;
  readonly context: GPUCanvasContext;
  readonly device: GPUDevice;
  readonly format: GPUTextureFormat;

  private _pipelineMode: PipelineMode = 'default';
  private _shaderModule: GPUShaderModule | undefined;
  private _pipelines: Array<GPUPipeline> = [];
  private _transformations: GpuTransformations = {
    projection: Transform.identity(),
    view: Transform.identity(),
    model: Transform.identity(),
  };
  private _renderPassDescription: GPURenderPassDescriptor | undefined = undefined;
  private _transGen: TransCbs | undefined;
  private _fps = fps.init();

  private _rebuildViewTexture: ReturnType<typeof initRebuildViewTexture> | undefined = undefined;

  private _dirLights: Array<DirectionalLight> = [
    { dir: UnitVector.fromValues(0.0, -1.5, -0.5), col: [0.3, 0.3, 0.3, 1.0] },
    { dir: UnitVector.fromValues(-1.0, -1.0, 1.0), col: [0.4, 0.4, 0.4, 1.0] },
    { dir: UnitVector.fromValues(1.0, 0.0, 0.0), col: [0.5, 0.5, 0.5, 0.0] },
    { dir: UnitVector.fromValues(-1.0, -1.0, -1.0), col: [0.3, 0.3, 0.3, 0.0] },
  ];
  private _pointLights: Array<PointLight> = [
    { pos: Point.fromValues(-10.0, -10.0, -10.0), col: [0.4, 0.4, 0.4, 1.0] },
    { pos: Point.fromValues(10.0, 10.0, 10.0), col: [0.4, 0.3, 0.6, 0.0] },
    { pos: Point.fromValues(3.0, -15.0, -5.0), col: [0.2, 0.2, 0.7, 0.0] },
    { pos: Point.fromValues(13.0, 12.0, -13.0), col: [0.6, 0.1, 0.1, 0.0] },
  ];

  private constructor(canvas: HTMLCanvasElement, context: GPUCanvasContext, device: GPUDevice, format: GPUTextureFormat) {
    this.canvas = canvas;
    this.context = context;
    this.device = device;
    this.format = format;
    this._rebuildViewTexture = initRebuildViewTexture(this);

    this.device.lost.then(() => {
      // TODO: handle loosing the device and recreate it
      console.log('WebGPU:device lost');
    });
  }

  get fps(): number {
    return this._fps.getFPS();
  }

  get dirLights(): Array<DirectionalLight> {
    return this._dirLights;
  }

  get pontLights(): Array<PointLight> {
    return this._pointLights;
  }

  /**
   * Create a GPU connection
   * @param canvas - target canvas for the target texture for rendering
   * @returns
   */
  static async build(canvas: HTMLCanvasElement): Promise<Gpu> {
    return connectGPU(canvas).then(({ canvas, context, device, format }) => {
      return new Gpu(canvas, context, device, format);
    });
  }

  setPipelineMode(mode: PipelineMode) {
    this._pipelineMode = mode;
  }

  get pipelines(): Array<GPUPipeline> {
    return this._pipelines;
  }

  async setupShaders(shaders: Shaders): Promise<void> {
    let shaderSource: string;
    if (isPredefinedShader(shaders)) {
      switch (shaders) {
        case 'standard-3d':
          shaderSource = shader3D;
          break;
        case 'standard-2d':
        default:
          shaderSource = shader2D;
          break;
      }
    } else {
      shaderSource = shaders.source;
    }
    this._shaderModule = await setupShaderModule(this, shaderSource);
  }

  /**
   * Setup the GeoBuilder
   * @param geoBuilder
   * @returns
   */
  async setupGeoBuilder(scene: Scene): Promise<void> {
    if (!this._shaderModule) {
      throw new Error('WebGPU:shader module is NOT available!');
    }
    // Setup the GPU pipeline with the compiled shaders
    this._pipelines = createPipelines(this, this._shaderModule, scene);

    this._renderPassDescription = buildRenderPassDescriptor(this);
  }

  /**
   * Enable mouse motion capture
   * @param cb - callback for mouse motion
   * @returns none
   */
  captureMouseMotion(cb?: MouseCbs) {
    initMouseHandler(this.canvas, {
      move:
        cb?.move ??
        ((_bt, _r, _p) => {
          // console.log('Mouse move:', bt, r, p);
        }),
      click:
        cb?.click ??
        ((_bt, _p) => {
          // console.log('Mouse click:', bt, p);
        }),
      zoom:
        cb?.zoom ??
        ((_delta) => {
          // console.log('Mouse zoom:', delta);
        }),
    });
  }

  sceneIntoBuffer(buffer: GPUBuffer[]) {
    const { device } = this;
    const { projection, view } = this._transformations;
    const viewInv = view.invert();
    // Writes the 3 matrixes into the uniformBuffer ...
    let transOffset = 0;
    let lightOffset = 0;
    device.queue.writeBuffer(buffer[0], transOffset, view.buffer());
    transOffset += Transform.bufferSize;
    device.queue.writeBuffer(buffer[0], transOffset, viewInv.buffer());
    transOffset += Transform.bufferSize;
    device.queue.writeBuffer(buffer[0], transOffset, projection.buffer());
    transOffset += Transform.bufferSize;

    const dirLightsBuffer = new Float32Array(this._dirLights.flatMap(({ dir, col }) => [...dir.coordinates, ...col]));
    device.queue.writeBuffer(buffer[1], lightOffset, dirLightsBuffer);
    lightOffset += dirLightsBuffer.byteLength;
    const posLightBuffer = new Float32Array(this._pointLights.flatMap(({ pos, col }) => [...pos.coordinates, ...col]));
    device.queue.writeBuffer(buffer[1], lightOffset, posLightBuffer);
    lightOffset += posLightBuffer.byteLength;
  }

  rotateLights() {
    const rotX = Transform.rotationX(-Math.PI / 640);
    const rotY = Transform.rotationY(Math.PI / 240);
    const rotZ = Transform.rotationZ(Math.PI / 360);
    const trans = [rotZ, rotY.compose(rotZ), rotZ.compose(rotX).compose(rotY), rotZ];
    this._pointLights.forEach((light, idx) => {
      light.pos = light.pos.map(trans[idx]);
    });
  }

  /**
   * render the scene
   * @param transf
   * @returns none
   * @private
   */
  private render = () => {
    const { device } = this;
    this.rotateLights();

    // 1 - We rebuild the rendering texture id needed when canvas is resized!
    let renderPassDescription = this._rebuildViewTexture
      ? this._rebuildViewTexture(this._renderPassDescription!)
      : this._renderPassDescription;
    if (!renderPassDescription) {
      console.error('WebGPU:renderPassDescription is NOT available!');
      return;
    }

    const commandEncoder = device.createCommandEncoder();
    const renderPass = commandEncoder.beginRenderPass(renderPassDescription);

    this._pipelines.forEach((gpuPipeLine, idx) => {
      const { pipeline, altPipeline, uniformBuffers, bindGroups, triangleMesh } = gpuPipeLine;

      // We need to send the scene data only once!
      if (idx === 0) {
        // Writes the Scene into the uniformBuffer ZERO...
        this.sceneIntoBuffer(uniformBuffers[0]);
        renderPass.setBindGroup(0, bindGroups[0]!); // Scene data binding groups
      }

      const activePipeline = this._pipelineMode === 'default' ? pipeline : altPipeline;
      renderPass.setPipeline(activePipeline);

      // For each object in the scene we set the uniform buffer with the color and (potentially) the model matrix
      const uniformColorData = new Float32Array(triangleMesh.color); // Color for the current object
      device.queue.writeBuffer(uniformBuffers[1][0], 0, uniformColorData);
      renderPass.setBindGroup(1, bindGroups[1]!); // Color

      if (bindGroups[2]) {
        renderPass.setBindGroup(2, bindGroups[2]); // Texture data
      }

      triangleMesh.buffers.forEach((buffer, idx) => {
        renderPass.setVertexBuffer(0, buffer);
        renderPass.draw(triangleMesh.getVertexCountPerStrip(idx));
      });
    });
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
    this._fps.measureFPS();
  };

  private renderLoop() {
    const { width, height } = this.canvas;
    // Get transformation from the outside to allow camera and model movements.
    this._transformations = getTransformations(this._transformations, [width, height], this._transGen);

    this.render();
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  beginRenderLoop(transGen?: TransCbs) {
    this._transGen = transGen;
    this.renderLoop();
  }
}
