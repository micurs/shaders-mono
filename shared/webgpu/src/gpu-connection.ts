import { Point, Transform, UnitVector, deg2rad } from '@shaders-mono/geopro';

import {
  PredefinedShaders,
  GPUConnection,
  GPUPipeline,
  GpuTransformations,
  Shaders,
  TransGen,
  GeoBuilder,
  TriangleMesh,
  Material,
} from './types';
import { setupShaderModule } from './internal/setup-shaders';
import { createPipeline } from './internal/setup-pipline';

import shader3D from './internal/shader3d.wgsl?raw';
import shader2D from './internal/shader2d.wgsl?raw';

const isPredefinedShader = (shader: Shaders): shader is PredefinedShaders => {
  return typeof shader === 'string';
};

/**
 * Set the Transformation for the scene.
 * @param t - The Transformations for the scene
 * @param param1 - dimension of the viewport
 * @param transGen - optional generator of view transformation
 */
const getTransformations = (
  currTrans: GpuTransformations,
  [w, h]: [number, number],
  transGen?: TransGen
): GpuTransformations => {
  return {
    view:
      transGen && transGen.view
        ? transGen.view(currTrans.view)
        : Transform.lookAt(
            Point.fromValues(-1.0, -1.0, 0.0), // eye
            Point.fromValues(0, 0, 0), // target
            UnitVector.fromValues(0, 0, 1) // vup
          ),
    model:
      transGen && transGen.model
        ? transGen.model(currTrans.model) // Compose the current model with the new one from transGen
        : currTrans.model.composeWith(Transform.rotationZ(deg2rad(1.0))),
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
    device: device,
    format: format,
    //size: size
    alphaMode: 'opaque',
  });
  return { context, device, canvas, format };
};

export class Gpu implements GPUConnection {
  readonly canvas: HTMLCanvasElement;
  readonly context: GPUCanvasContext;
  readonly device: GPUDevice;
  readonly format: GPUTextureFormat;

  private _shaderModule: GPUShaderModule | undefined;
  private _pipeline: GPUPipeline | undefined;
  private _transformations: GpuTransformations = {
    projection: Transform.identity(),
    view: Transform.identity(),
    model: Transform.identity(),
  };

  private constructor(canvas: HTMLCanvasElement, context: GPUCanvasContext, device: GPUDevice, format: GPUTextureFormat) {
    this.canvas = canvas;
    this.context = context;
    this.device = device;
    this.format = format;
  }

  static async build(canvas: HTMLCanvasElement): Promise<Gpu> {
    return getGPU(canvas).then(({ canvas, context, device, format }) => {
      return new Gpu(canvas, context, device, format);
    });
  }

  get pipeline(): GPUPipeline | undefined {
    return this._pipeline;
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
  async setupGeoBuilder(geoBuilder: GeoBuilder): Promise<void> {
    if (!this._shaderModule) {
      throw new Error('WebGPU:shader module is NOT available!');
    }
    // Setup the GPU pipeline with the compiled shaders
    this._pipeline = await createPipeline(this, this._shaderModule, geoBuilder);
  }

  /**
   * render the scene
   * @param transf
   * @returns none
   * @private
   */
  private render = () => {
    const { device, context } = this;
    const { pipeline, uniformBuffer, renderPassDescription, bindGroup, triangleMesh } = this._pipeline!;
    const { projection, view, model } = this._transformations;

    // Writes the 3 matrixes into the uniformBuffer ...
    device.queue.writeBuffer(uniformBuffer, 0, model.buffer());
    device.queue.writeBuffer(uniformBuffer, 16 * 4, view.buffer());
    device.queue.writeBuffer(uniformBuffer, 2 * 16 * 4, projection.buffer());

    const commandEncoder = device.createCommandEncoder();

    const textureView = context.getCurrentTexture().createView();

    const colors = renderPassDescription.colorAttachments! as GPURenderPassColorAttachment[];
    colors[0]!.view = textureView;

    const renderPass = commandEncoder.beginRenderPass(renderPassDescription);
    renderPass.setPipeline(pipeline);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.setVertexBuffer(0, triangleMesh.buffer);
    // renderPass.draw(6, 1, 0, 0);
    renderPass.draw(triangleMesh.vertexCount);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
  };

  private renderLoop() {
    const { width, height } = this.canvas;
    if (!this._pipeline) {
      return;
    }
    // Get transformation from the outside to allow camera and model movements.
    this._transformations = getTransformations(this._transformations, [width, height]);

    this.render();
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  beginRenderLoop() {
    this.renderLoop();
  }
}
