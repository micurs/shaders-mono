import { Gpu } from './gpu-connection';
import { createGPUBuffer } from './internal/utils';
import { TriangleData } from './triangle-data';
import { Material, TriangleMesh } from './types';

// export namespace WebGPU {

/**
 * Initialize the WebGPU connection
 * @param canvas - the canvas to be used for the WebGPU connection
 * @returns a Promise with the GPU connection
 */
export const initialize = async (canvas: HTMLCanvasElement): Promise<Gpu> => {
  if (!navigator.gpu) {
    return Promise.reject(new Error('WebGPU is not supported in this browser!'));
  }

  // Connect to WebGPU and bind the connection to a given Canvas
  const gpu = await Gpu.build(canvas);

  return Promise.resolve(gpu);
};

/**
 * Create a WebGPU texture material from an ImageBitmap
 * @param gpu - the current GPU connection
 * @param image - the image to be used as a texture
 * @returns
 */
export const createTexture = (gpu: Gpu, image: ImageBitmap): Material => {
  const { device } = gpu;
  const format = 'rgba8unorm';

  // 1 - Create the texture
  const textureDesc: GPUTextureDescriptor = {
    size: [image.width, image.height, 1],
    format,
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
  };
  const texture = device.createTexture(textureDesc);

  // No that we have a texture in the gpu, we can copy the image to it
  device.queue.copyExternalImageToTexture(
    { source: image }, // the data
    { texture: texture }, // the texture in the gpu receiving the data
    [image.width, image.height] // The image resolution
  );

  const view = texture.createView(); // TODO: add texture view options

  // Next, create the Sampler to get the image from the texture using u,v coordinates
  const samplerDescriptor: GPUSamplerDescriptor = {
    addressModeU: 'repeat',
    addressModeV: 'repeat',
    magFilter: 'linear',
    minFilter: 'nearest',
    mipmapFilter: 'nearest',
    maxAnisotropy: 1,
  };
  const sampler = device.createSampler(samplerDescriptor);
  return {
    texture,
    view,
    sampler,
  };
};

/**
 * Create a triangle mesh from a given triangle data, that is GPUBuffer and GPUVertexBufferLayout for WebGpu
 * @param gpu - The current GPU connection
 * @param trimesh - The triangle data as a TriangleData object
 * @returns a TriangleMesh object with the WebGPU buffer and layout
 */
export const createTriangleMesh = (gpu: Gpu, trimesh: TriangleData): TriangleMesh => {
  const vertexCount = trimesh.vertexCount; // vertices.length / vertexSize;

  const buffer = createGPUBuffer(gpu.device, trimesh.vertices);

  const bufferLayout: GPUVertexBufferLayout = {
    arrayStride: trimesh.vertexByteSize, // vertexSize * float32Size, // 5 x 32 bit numbers (i.e 4 byte each!)
    attributes: trimesh.layouts,
  };
  return {
    vertexCount,
    buffer,
    bufferLayout,
    size: trimesh.byteSize,
  };
};
// }
