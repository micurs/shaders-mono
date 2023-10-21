import { Gpu } from './gpu-connection';
import { GPUConnection } from './types';


export namespace WebGPU {
  export const initialize = async (canvas: HTMLCanvasElement): Promise<GPUConnection> => {
    if (!navigator.gpu) {
      return Promise.reject(new Error('WebGPU is not supported in this browser!'));
    }

    // Connect to WebGPU and bind the connection to a given Canvas
    const gpu = await Gpu.build(canvas);

    return Promise.resolve(gpu);
  };
}
