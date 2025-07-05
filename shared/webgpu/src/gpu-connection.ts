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
import { buildRenderPassDescriptor, connectGPU, getTransformations, isPredefinedShader, notNull } from './internal/utils';

import shader3D from './internal/shader3d.wgsl?raw';
import shader2D from './internal/shader2d.wgsl?raw';
import { initRebuildViewTexture } from './internal/resize-render-target';
import { GeoRenderable } from '.';

type PipelineMode = 'default' | 'alternative';
export class Gpu implements GPUConnection {
  readonly canvas: HTMLCanvasElement;
  readonly context: GPUCanvasContext;
  readonly device: GPUDevice;
  readonly format: GPUTextureFormat;

  private _handleOnRender: ((gpu: GPUConnection) => void) | undefined = undefined;
  private _vertexCount = 0;
  private _activeRenderLoop = false;
  private _pipelineMode: PipelineMode = 'default';
  private _shaderModule: GPUShaderModule | undefined;
  private _pipelines: Map<string, GPUPipeline> = new Map();
  private _transformations: CameraTransformations = {
    projection: Transform.identity(),
    view: Transform.identity(),
  };

  private _cameraTransHandler: CameraTransformationHandlers | undefined = undefined;
  private _lightsHandler: LightsTransformationHandlers | undefined = undefined;
  private _modelHandlers: ModelTransformationHandlers = {};
  private _fps = fps.init();

  private _rebuildViewTexture: ReturnType<typeof initRebuildViewTexture> | undefined = undefined;
  private _colorTexture: GPUTexture | undefined = undefined;
  private _depthTexture: GPUTexture | undefined = undefined;

  // Lights
  private _ambientLight: RGBAColor = [0.3, 0.3, 0.3, 1.0];

  private _dirLights: Array<DirectionalLight> = [
    { dir: UnitVector.fromValues(0.0, 0.0, 1.0), col: [0.4, 0.4, 0.4, 0.0] },
    { dir: UnitVector.fromValues(1.0, 1.0, 1.0), col: [0.4, 0.3, 0.3, 0.0] },
    { dir: UnitVector.fromValues(1.0, 0.0, 0.0), col: [0.5, 0.5, 0.5, 0.0] },
    { dir: UnitVector.fromValues(-1.0, -1.0, -1.0), col: [0.3, 0.3, 0.3, 0.0] },
  ];
  private _pointLights: Array<PointLight> = [
    { pos: Point.fromValues(-12.0, 12.0, 8.0), col: [0.5, 0.5, 0.2, 0.0] },
    { pos: Point.fromValues(12.0, 12.0, 8.0), col: [0.4, 0.2, 0.2, 0.0] },
    { pos: Point.fromValues(-12, -12.0, 8.0), col: [0.2, 0.2, 0.5, 0.0] },
    { pos: Point.fromValues(12.0, -12.0, 8.0), col: [0.5, 0.1, 0.5, 0.0] },
  ];

  private constructor(canvas: HTMLCanvasElement, context: GPUCanvasContext, device: GPUDevice, format: GPUTextureFormat) {
    this.canvas = canvas;
    this.context = context;
    this.device = device;
    this.format = format;
    this._rebuildViewTexture = initRebuildViewTexture(this);

    // Initialize color and depth textures
    this._colorTexture = device.createTexture({
      size: { width: canvas.width, height: canvas.height, depthOrArrayLayers: 1 },
      sampleCount: 1,
      format: this.format,
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    this._depthTexture = device.createTexture({
      label: 'DepthTexture',
      sampleCount: 1,
      size: [canvas.width, canvas.height, 1],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });

    this.device.lost.then(() => {
      // TODO: handle loosing the device and recreate it
      console.log('WebGPU:device lost');
    });
  }

  get vertexCount(): number {
    return this._vertexCount;
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

  get(...pipelines: string[]): Array<GeoRenderable<unknown>> {
    return pipelines
      .map((s) => this._pipelines.get(s))
      .filter(notNull)
      .map((p) => p.geoRenderable);
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

  getScene<B>(): Scene<B> {
    return [...this._pipelines.values()].map(({ geoRenderable }) => geoRenderable as GeoRenderable<B>);
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
  setScene(scene: Scene<unknown>) {
    if (!this._shaderModule) {
      throw new Error('WebGPU:shader module is NOT available!');
    }
    // 1 - Setup the GPU buffers for the scene
    scene.forEach((geo) => {
      geo.buildGpuBuffer(this);
    });

    // 2 - Setup the GPU pipeline with the compiled shaders
    this._pipelines = createPipelines(this, this._shaderModule, scene);

    // // 3 - Setup the render pass descriptor
    buildRenderPassDescriptor(this, this._colorTexture!.createView(), this._depthTexture!.createView());
  }

  addToScene(scene: Scene<unknown>) {
    if (!this._shaderModule) {
      throw new Error('WebGPU:shader module is NOT available!');
    }
    // 1 - Setup the GPU buffers for the scene
    scene.forEach((geo) => {
      geo.buildGpuBuffer(this);
    });

    // 2 - Update the GPU pipeline with the compiled shaders
    const newPipelines = createPipelines(this, this._shaderModule, scene);
    newPipelines.forEach((pipeline, key) => {
      this._pipelines.set(key, pipeline);
    });
  }

  removeFromScene(id: string) {
    return this._pipelines.delete(id);
  }

  clearScene() {
    this._pipelines.clear();
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
    lightOffset += ambientLightBuffer.byteLength;
    device.queue.writeBuffer(buffer[1], lightOffset, new Uint32Array([this._dirLights.length, this._pointLights.length]));
  }

  updateLights(timeSpan: number) {
    if (!this._lightsHandler) {
      return;
    }
    const { dirLights, posLights } = this._lightsHandler;
    dirLights && dirLights(timeSpan, this._dirLights);
    posLights && posLights(timeSpan, this._pointLights);
  }

  onRender(cb: (gpu: GPUConnection) => void) {
    this._handleOnRender = cb;
  }

  /**
   * render the scene
   * @param transf
   * @returns none
   * @private
   */
  private render = () => {
    const { device } = this;
    this._vertexCount = 0;

    // 0 - If available calls the onRender callback to update the scene
    this._handleOnRender && this._handleOnRender(this);

    // 1 - We rebuild the rendering texture id needed when canvas is resized!
    let renderPassDescription: GPURenderPassDescriptor = buildRenderPassDescriptor(
      this,
      this._colorTexture!.createView(),
      this._depthTexture!.createView()
    );
    if (this._rebuildViewTexture) {
      renderPassDescription = this._rebuildViewTexture(renderPassDescription);
    }

    const commandEncoder = device.createCommandEncoder();
    const renderPass = commandEncoder.beginRenderPass(renderPassDescription);
    const timeSpan = this._fps.getLastTimeSpan();
    this.updateLights(timeSpan);

    // Render opaque objects first
    this.pipelines
      .filter(({ geoRenderable }) => geoRenderable.colors[0][3] === 1.0)
      .forEach((gpuPipeLine, idx) => {
        this.renderPipeline(gpuPipeLine, idx, renderPass, timeSpan);
      });
    // Render transparent objects last
    this.pipelines
      .filter(({ geoRenderable }) => geoRenderable.colors[0][3] < 1.0)
      .forEach((gpuPipeLine, idx) => {
        this.renderPipeline(gpuPipeLine, idx, renderPass, timeSpan);
      });
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
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
      this.sceneIntoBuffer(uniformBuffers.sceneBuffers);
      renderPass.setBindGroup(0, bindGroups.sceneGroup); // Scene data binding groups
    }

    if (geoRenderable.display === 'none') {
      return;
    }

    const activePipeline = this._pipelineMode === 'default' ? pipeline : altPipeline;
    renderPass.setPipeline(activePipeline);

    if (this._modelHandlers[geoRenderable.id]) {
      geoRenderable.transform(timeSpan, this._modelHandlers[geoRenderable.id]);
    }

    device.queue.writeBuffer(uniformBuffers.modelBuffers[0], 0, geoRenderable.transformationData);
    renderPass.setBindGroup(2, bindGroups.modelGroup); // Model transformation

    if (bindGroups.texturesGroup) {
      renderPass.setBindGroup(3, bindGroups.texturesGroup); // Texture data
    }

    geoRenderable.buffers.forEach((buffer, idx) => {
      // For each object in the scene we set the uniform buffer with the color and (potentially) the model matrix
      const uniformColorData = new Float32Array(geoRenderable.colors[idx]); // Color for the current object
      device.queue.writeBuffer(uniformBuffers.colorBuffers[0], 0, uniformColorData);
      device.queue.writeBuffer(uniformBuffers.colorBuffers[1], 0, new Float32Array([geoRenderable.materialProperties.alpha, geoRenderable.materialProperties.bumpIntensity]));
      renderPass.setBindGroup(1, bindGroups.colorGroup); // Color
      const vtx = geoRenderable.getVertexCountPerStrip(idx);
      this._vertexCount += vtx;
      renderPass.setVertexBuffer(0, buffer);
      renderPass.draw(vtx);
    });
  }

  private renderLoop() {
    const { width, height } = this.canvas;
    // Get transformation from the outside to allow camera and model movements.
    this._transformations = getTransformations(this._transformations, [width, height], this._cameraTransHandler);

    this.render();
    this._fps.measureFPS();
    this._activeRenderLoop && requestAnimationFrame(this.renderLoop.bind(this));
  }

  beginRenderLoop(frameHandlers?: FrameHandlers) {
    this._fps = fps.init();
    this._cameraTransHandler = frameHandlers?.camera;
    this._lightsHandler = frameHandlers?.lights;
    this._modelHandlers = frameHandlers?.models ?? {};
    this._activeRenderLoop = true;
    this.renderLoop();
  }

  setLightsHandler(lights: LightsTransformationHandlers) {
    this._lightsHandler = lights;
  }

  endRenderLoop() {
    this._activeRenderLoop = false;
  }
}
