import { Point, Transform, UnitVector } from '@shaders-mono/geopro';

import { PredefinedShaders, GPUConnection, GPUPipeline, GpuTransformations, Shaders, TransCbs, MouseCbs, Scene } from './types';
import { setupShaderModule } from './internal/setup-shaders';
import { createPipelines } from './internal/setup-pipline';

import shader3D from './internal/shader3d.wgsl?raw';
import shader2D from './internal/shader2d.wgsl?raw';
import { initMouseHandler } from './internal/mouse-capture';
import { buildRenderPassDescriptor } from './internal/utils';

const isPredefinedShader = (shader: Shaders): shader is PredefinedShaders => {
  return typeof shader === 'string';
};

/**
 * Set the Transformation for the scene.
 * @param t - The Transformations for the scene
 * @param param1 - dimension of the viewport
 * @param transGen - optional generator of view transformation
 */
const getTransformations = (currTrans: GpuTransformations, [w, h]: [number, number], transGen?: TransCbs): GpuTransformations => {
  return {
    view:
      transGen && transGen.view
        ? transGen.view(currTrans.view)
        : Transform.lookAt(
            Point.fromValues(-5.0, -5.0, -5.0), // eye
            Point.fromValues(0, 0, 0), // target
            UnitVector.fromValues(0, 0, 1) // vup
          ),
    model:
      transGen && transGen.model
        ? transGen.model(currTrans.model) // Compose the current model with the new one from transGen
        : currTrans.model, // .composeWith(Transform.rotationY(deg2rad(1.0))),
    projection:
      transGen && transGen.projection
        ? transGen.projection(currTrans.projection) // Compose the current projection with the new one from transGen
        : Transform.perspective(Math.PI / 5, w / h, 0.1, 100.0),
  };
};

/**
 * Connect WebGPU to the canvas
 * @param canvas
 * @returns
 */
const getGPU = async (canvas: HTMLCanvasElement): Promise<GPUConnection> => {
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
  if (!adapter) {
    throw new Error('WebGPU:adapter is NOT available!');
  }

  const info = await adapter.requestAdapterInfo();
  console.log('WebGPU:adapter info', info);
  console.log('WebGPU:adapter is fallback:', adapter.isFallbackAdapter);

  const device = await adapter.requestDevice();
  if (!device) {
    throw new Error('WebGPU:device is NOT available!');
  }

  const context = (canvas as HTMLCanvasElement).getContext('webgpu');
  if (!context) {
    throw new Error('WebGPU:context from instantiated Canvas not available!');
  }

  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format,
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
    alphaMode: 'opaque', // 'premultiplied' should allow transparency, but it does not work?.
  });

  return { context, device, canvas, format };
};

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

  private constructor(canvas: HTMLCanvasElement, context: GPUCanvasContext, device: GPUDevice, format: GPUTextureFormat) {
    this.canvas = canvas;
    this.context = context;
    this.device = device;
    this.format = format;

    this.device.lost.then(() => {
      // TODO: handle loosing the device and recreate it
      console.log('WebGPU:device lost');
    });
  }

  /**
   * Create a GPU connection
   * @param canvas - target canvas for the target texture for rendering
   * @returns
   */
  static async build(canvas: HTMLCanvasElement): Promise<Gpu> {
    return getGPU(canvas).then(({ canvas, context, device, format }) => {
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
        ((bt, r, p) => {
          console.log('Mouse move:', bt, r, p);
        }),
      click:
        cb?.click ??
        ((bt, p) => {
          console.log('Mouse click:', bt, p);
        }),
      zoom:
        cb?.zoom ??
        ((delta) => {
          console.log('Mouse zoom:', delta);
        }),
    });
  }

  /**
   * render the scene
   * @param transf
   * @returns none
   * @private
   */
  private render = () => {
    const { device, context, _renderPassDescription } = this;

    const { projection, view, model } = this._transformations;

    if (!_renderPassDescription) {
      console.error('WebGPU:renderPassDescription is NOT available!');
      return;
    }

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const colors = _renderPassDescription.colorAttachments! as GPURenderPassColorAttachment[];
    colors[0]!.view = textureView;
    const renderPass = commandEncoder.beginRenderPass(_renderPassDescription);

    this._pipelines.forEach((gpuPipeLine) => {
      const { pipeline, altPipeline, uniformBuffers, bindGroups, triangleMesh } = gpuPipeLine;

      const activePipeline = this._pipelineMode === 'default' ? pipeline : altPipeline;
      renderPass.setPipeline(activePipeline);

      // Writes the 3 matrixes into the uniformBuffer ...
      device.queue.writeBuffer(uniformBuffers[0], 0, model.buffer());
      device.queue.writeBuffer(uniformBuffers[0], 16 * 4, view.buffer());
      device.queue.writeBuffer(uniformBuffers[0], 2 * 16 * 4, view.invert().buffer());
      device.queue.writeBuffer(uniformBuffers[0], 3 * 16 * 4, projection.buffer());
      renderPass.setBindGroup(0, bindGroups[0]!); // Transformation binding groups

      // For each object in the scene we set the uniform buffer with the color and (potentially) the model matrix
      const uniformColorData = new Float32Array(triangleMesh.color); // Color for the current object
      device.queue.writeBuffer(uniformBuffers[1], 0, uniformColorData);
      renderPass.setBindGroup(1, bindGroups[1]!); // Color

      if (bindGroups[2]) {
        renderPass.setBindGroup(2, bindGroups[2]); // Texture data
      }

      renderPass.setVertexBuffer(0, triangleMesh.buffer);
      renderPass.draw(triangleMesh.vertexCount);
    });
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
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
