import { GPUConnection } from './types';

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
}
