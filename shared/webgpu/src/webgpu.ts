import { Gpu } from './gpu-connection';
import { Material, RGBAColor } from './types';

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

export const styleHexColorToRGBA = (styleColor: string): RGBAColor => {
  const r = parseInt(styleColor.substr(1, 2), 16) / 255;
  const g = parseInt(styleColor.substr(3, 2), 16) / 255;
  const b = parseInt(styleColor.substr(5, 2), 16) / 255;
  const a = 1;
  return [r, g, b, a];
};

/**
 * Parse a style color in the forma rgb(r,g,b) or rgba(r,g,b,a) to a GPUColor object
 * @param styleColor
 * @returns
 */
export const styleColorToGpu = (styleColor: string): GPUColor => {
  let values: number[] = [];

  // Extract numbers from the rgb/rgba string
  const regex = /rgba?\(([^)]+)\)/;
  const matches = regex.exec(styleColor);

  if (matches && matches[1]) {
    values = matches[1].split(',').map((num) => parseFloat(num.trim()));
  }

  if (values.length < 3) {
    throw new Error('Invalid RGB/RGBA format');
  }

  const r = values[0] / 255;
  const g = values[1] / 255;
  const b = values[2] / 255;
  const a = values.length === 4 ? values[3] : 1; // default to 1 if alpha is not provided

  return { r, g, b, a };
};

/**
 * Parse a style color in the forma rgb(r,g,b) or rgba(r,g,b,a) to a GPUColor object
 * @param styleColor
 * @returns
 */
export const styleColorToVec = (styleColor: string): RGBAColor => {
  let values: number[] = [];

  // Extract numbers from the rgb/rgba string
  const regex = /rgba?\(([^)]+)\)/;
  const matches = regex.exec(styleColor);

  if (matches && matches[1]) {
    values = matches[1].split(',').map((num) => parseFloat(num.trim()));
  }

  if (values.length < 3) {
    throw new Error('Invalid RGB/RGBA format');
  }

  const r = values[0] / 255;
  const g = values[1] / 255;
  const b = values[2] / 255;
  const a = values.length === 4 ? values[3] : 1; // default to 1 if alpha is not provided

  return [r, g, b, a];
};

export const RGBAColorToStyle = (color: RGBAColor): string => {
  const [r, g, b, a] = color;
  return `#${(r * 255).toString(16)}${(g * 255).toString(16)}${(b * 255).toString(16)}`;
};



