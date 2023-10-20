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

export namespace WebGPU {
  export const initialize = async (canvas: HTMLCanvasElement): Promise<GPUConnection> => {
    if (!navigator.gpu) {
      return Promise.reject(new Error('WebGPU is not supported in this browser!'));
    }

    // Connect to WebGPU and bind the connection to a given Canvas
    const gpu = await getGPU(canvas);

    return Promise.resolve(gpu);
  };
}
