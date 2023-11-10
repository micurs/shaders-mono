import { Point, Transform, UnitVector } from '@shaders-mono/geopro';

import * as fps from './internal/fps';
import {
  GPUConnection,
  GPUPipeline,
  CameraTransformations,
  Shaders,
  CameraTransformationHandlers,
  MouseCbs,
  Scene,
  DirectionalLight,
  PointLight,
  RGBAColor,
  FrameHandlers,
  LightsTransformationHandlers,
  ModelTransformationHandlers,
} from './types';
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

  private _activeRenderLoop = false;
  private _pipelineMode: PipelineMode = 'default';
  private _shaderModule: GPUShaderModule | undefined;
  private _pipelines: Map<string, GPUPipeline> = new Map();
  private _transformations: CameraTransformations = {
    projection: Transform.identity(),
    view: Transform.identity(),
  };
  private _renderPassDescription: GPURenderPassDescriptor | undefined = undefined;
  private _cameraTransHandler: CameraTransformationHandlers | undefined = undefined;
  private _lightsHandler: LightsTransformationHandlers | undefined = undefined;
  private _modelHandlers: ModelTransformationHandlers = {};
  private _fps = fps.init();

  private _rebuildViewTexture: ReturnType<typeof initRebuildViewTexture> | undefined = undefined;

  // Lights
  private _ambientLight: RGBAColor = [0.1, 0.1, 0.1, 1.0];

  private _dirLights: Array<DirectionalLight> = [
    { dir: UnitVector.fromValues(-1.0, -1.0, -1.0), col: [0.5, 0.5, 0.5, 1.0] },
    { dir: UnitVector.fromValues(1.0, 1.0, 1.0), col: [0.4, 0.3, 0.3, 1.0] },
    { dir: UnitVector.fromValues(1.0, 0.0, 0.0), col: [0.5, 0.5, 0.5, 0.0] },
    { dir: UnitVector.fromValues(-1.0, -1.0, -1.0), col: [0.3, 0.3, 0.3, 0.0] },
  ];
  private _pointLights: Array<PointLight> = [
    { pos: Point.fromValues(8.0, 8.0, 8.0), col: [0.4, 0.4, 0.4, 1.0] },
    { pos: Point.fromValues(0.0, 0.0, 4.0), col: [0.3, 0.3, 0.4, 1.0] },
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

  setAmbientLight(lightCol: RGBAColor) {
    this._ambientLight = lightCol as RGBAColor;
  }

  setLight(type: 'ambient' | 'directional' | 'point', idx: number, light: DirectionalLight | PointLight) {
    switch (type) {
      case 'directional':
        this._dirLights[idx] = light as DirectionalLight;
        break;
      case 'point':
        this._pointLights[idx] = light as PointLight;
        break;
    }
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
    return [...this._pipelines.values()];
  }

  /**
   *
   * @param shaders - the source code for the shaders or predefined shaders
   * @returns
   */
  async setupShaders(shaders: Shaders): Promise<Gpu> {
    if (this._shaderModule) {
      return this;
    }
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
    return this;
  }

  /**
   * Setup the GeoBuilder
   * @param geoBuilder
   * @returns
   */
  setScene(scene: Scene) {
    if (!this._shaderModule) {
      throw new Error('WebGPU:shader module is NOT available!');
    }
    // 1 - Setup the GPU buffers for the scene
    scene.forEach(([geo, _]) => {
      geo.buildGpuBuffer(this);
    });

    // 2 - Setup the GPU pipeline with the compiled shaders
    this._pipelines = createPipelines(this, this._shaderModule, scene);

    // // 3 - Setup the render pass descriptor
    this._renderPassDescription = buildRenderPassDescriptor(this);
  }

  addToScene(scene: Scene) {
    if (!this._shaderModule) {
      throw new Error('WebGPU:shader module is NOT available!');
    }
    // 1 - Setup the GPU buffers for the scene
    scene.forEach(([geo, _]) => {
      geo.buildGpuBuffer(this);
    });

    // 2 - Update the GPU pipeline with the compiled shaders
    const newPipelines = createPipelines(this, this._shaderModule, scene);
    newPipelines.forEach((pipeline, key) => {
      this._pipelines.set(key, pipeline);
    });
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
      tilt:
        cb?.tilt ??
        ((_delta) => {
          // console.log('Mouse tilt:', delta);
        }),
    });
  }

  sceneIntoBuffer(buffer: GPUBuffer[]) {
    const { device } = this;
    const { projection, view } = this._transformations;
    const viewInv = view.invert();

    // Writes the 3 matrixes into the uniformBuffer ...
    let transOffset = 0;
    device.queue.writeBuffer(buffer[0], transOffset, view.buffer());
    transOffset += Transform.bufferSize;
    device.queue.writeBuffer(buffer[0], transOffset, viewInv.buffer());
    transOffset += Transform.bufferSize;
    device.queue.writeBuffer(buffer[0], transOffset, projection.buffer());
    transOffset += Transform.bufferSize;

    // Lights
    let lightOffset = 0;
    const dirLightsBuffer = new Float32Array(this._dirLights.flatMap(({ dir, col }) => [...dir.coordinates, ...col]));
    device.queue.writeBuffer(buffer[1], lightOffset, dirLightsBuffer);
    lightOffset += dirLightsBuffer.byteLength;
    const posLightBuffer = new Float32Array(this._pointLights.flatMap(({ pos, col }) => [...pos.coordinates, ...col]));
    device.queue.writeBuffer(buffer[1], lightOffset, posLightBuffer);
    lightOffset += posLightBuffer.byteLength;
    const ambientLightBuffer = new Float32Array(this._ambientLight);
    device.queue.writeBuffer(buffer[1], lightOffset, ambientLightBuffer);
  }

  updateLights(timeSpan: number) {
    if (!this._lightsHandler) {
      return;
    }
    const { dirLights, posLights } = this._lightsHandler;
    dirLights && dirLights(timeSpan, this._dirLights);
    posLights && posLights(timeSpan, this._pointLights);
  }

  /**
   * render the scene
   * @param transf
   * @returns none
   * @private
   */
  private render = () => {
    const { device } = this;

    // 1 - We rebuild the rendering texture id needed when canvas is resized!
    let renderPassDescription: GPURenderPassDescriptor = this._renderPassDescription ?? buildRenderPassDescriptor(this);
    if (this._rebuildViewTexture) {
      this._renderPassDescription = this._rebuildViewTexture(renderPassDescription);
    }

    const commandEncoder = device.createCommandEncoder();
    const renderPass = commandEncoder.beginRenderPass(renderPassDescription);
    const timeSpan = this._fps.getLastTimeSpan();
    this.updateLights(timeSpan);
    // Render opaque objects first
    this.pipelines
      .filter(({ geoRenderable }) => geoRenderable.color[3] === 1.0)
      .forEach((gpuPipeLine, idx) => {
        this.renderPipeline(gpuPipeLine, idx, renderPass, timeSpan);
      });
    // Render transparent objects last
    this.pipelines
      .filter(({ geoRenderable }) => geoRenderable.color[3] < 1.0)
      .forEach((gpuPipeLine, idx) => {
        this.renderPipeline(gpuPipeLine, idx, renderPass, timeSpan);
      });
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
    this._fps.measureFPS();
  };

  /**
   * Render a pipeline and its associated geoRenderable
   * @param gpuPipeLine
   * @param idx
   * @param renderPass
   * @param device
   * @param timeSpan
   */
  private renderPipeline(gpuPipeLine: GPUPipeline, idx: number, renderPass: GPURenderPassEncoder, timeSpan: number) {
    const { pipeline, altPipeline, uniformBuffers, bindGroups, geoRenderable } = gpuPipeLine;
    const { device } = this;

    // We need to send the scene data only once!
    if (idx === 0) {
      // Writes the Scene into the uniformBuffer ZERO...
      this.sceneIntoBuffer(uniformBuffers[0]);
      renderPass.setBindGroup(0, bindGroups[0]); // Scene data binding groups
    }

    const activePipeline = this._pipelineMode === 'default' ? pipeline : altPipeline;
    renderPass.setPipeline(activePipeline);

    // For each object in the scene we set the uniform buffer with the color and (potentially) the model matrix
    const uniformColorData = new Float32Array(geoRenderable.color); // Color for the current object
    device.queue.writeBuffer(uniformBuffers[1][0], 0, uniformColorData);
    renderPass.setBindGroup(1, bindGroups[1]); // Color

    if (this._modelHandlers[geoRenderable.id]) {
      geoRenderable.transform(timeSpan, this._modelHandlers[geoRenderable.id]);
    }

    device.queue.writeBuffer(uniformBuffers[2][0], 0, geoRenderable.transformationData);
    renderPass.setBindGroup(2, bindGroups[2]); // Model transformation

    if (bindGroups[3]) {
      renderPass.setBindGroup(3, bindGroups[3]); // Texture data
    }

    geoRenderable.buffers.forEach((buffer, idx) => {
      renderPass.setVertexBuffer(0, buffer);
      renderPass.draw(geoRenderable.getVertexCountPerStrip(idx));
    });
  }

  private renderLoop() {
    const { width, height } = this.canvas;
    // Get transformation from the outside to allow camera and model movements.
    this._transformations = getTransformations(this._transformations, [width, height], this._cameraTransHandler);

    this.render();
    this._activeRenderLoop && requestAnimationFrame(this.renderLoop.bind(this));
  }

  beginRenderLoop(frameHandlers?: FrameHandlers) {
    // if (!this._renderPassDescription) {
    //   throw new Error('WebGPU:renderPassDescription is NOT available! - Did you call setScene() ?');
    // }
    this._cameraTransHandler = frameHandlers?.camera;
    this._lightsHandler = frameHandlers?.lights;
    this._modelHandlers = frameHandlers?.models ?? {};
    this._activeRenderLoop = true;
    this.renderLoop();
  }

  endRenderLoop() {
    this._activeRenderLoop = false;
  }
}
