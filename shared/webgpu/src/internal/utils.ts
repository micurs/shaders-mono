import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { Gpu } from '../gpu-connection';
import { GPUConnection, CameraTransformations, PredefinedShaders, RGBAColor, Shaders, CameraTransformationHandlers } from '../types';
import { styleColorToGpu } from '../webgpu';

export const createGPUBufferUint = (
  device: GPUDevice,
  data: Uint32Array,
  usageFlag: GPUBufferUsageFlags = GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
) => {
  const buffer = device.createBuffer({
    size: data.byteLength,
    usage: usageFlag,
    mappedAtCreation: true,
  });
  new Uint32Array(buffer.getMappedRange()).set(data);
  buffer.unmap();
  return buffer;
};

/**
 * Create a buffer for a Float32Array
 * @param device
 * @param data
 * @param usageFlag
 * @returns
 */
export const createGPUBuffer = (
  device: GPUDevice,
  data: Float32Array,
  usageFlag: GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
) => {
  const buffer = device.createBuffer({
    size: data.byteLength,
    usage: usageFlag,
    mappedAtCreation: true,
  });
  new Float32Array(buffer.getMappedRange()).set(data);
  buffer.unmap();
  return buffer;
};

export const buildRenderPassDescriptor = (gpu: Gpu): GPURenderPassDescriptor => {
  const { device, canvas } = gpu;

  const colorTexture = device.createTexture({
    size: { width: canvas.width, height: canvas.height, depthOrArrayLayers: 1 },
    sampleCount: 1, // set to 4 for MSAA multisampling
    format: gpu.format,
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  // Create the Z-buffer to hold depth values for each pixel and control the render pass.
  const depthTexture = device.createTexture({
    label: 'DepthTexture',
    sampleCount: 1,
    size: [canvas.width, canvas.height, 1],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });
  const clearColor = styleColorToGpu(window.getComputedStyle(canvas).backgroundColor);
  // const colorTexture = context.getCurrentTexture();

  return {
    colorAttachments: [
      {
        view: colorTexture.createView(),
        clearValue: clearColor, //background color
        //loadValue: { r: 0.2, g: 0.247, b: 0.314, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
    depthStencilAttachment: {
      view: depthTexture.createView(),
      depthClearValue: 1.0,
      // depthLoadValue: 1.0,
      depthStoreOp: 'store',
      depthLoadOp: 'clear',
      /*stencilClearValue: 0,
          stencilLoadValue: 0,
          stencilStoreOp: "store",
          stencilLoadOp: 'clear'*/
    },
  };
};

export const colorBuffer = (c: RGBAColor): Float32Array => {
  return new Float32Array(c);
};

/**
 * Connect WebGPU to the canvas
 * @param canvas
 * @returns
 */
export const connectGPU = async (canvas: HTMLCanvasElement): Promise<GPUConnection> => {
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
  if (!adapter) {
    throw new Error('WebGPU:adapter is NOT available!');
  }

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

  console.info('WegGPU: maxBindGroups:', device.limits.maxBindGroups);

  return { context, device, canvas, format };
};

/**
 * Type-predicate to check if a shader is a predefined shader
 * @param shader - a string containing the shader source code or the name of a predefined shader
 * @returns
 */
export const isPredefinedShader = (shader: Shaders): shader is PredefinedShaders => {
  return typeof shader === 'string';
};

/**
 * Set the Transformation for the scene. It set them with default values if no transGen is provided.
 * @param currTrans - The current transformations for the scene
 * @param dim - a pair with the dimensions of the viewport
 * @param transGen - optional generator of view transformation
 */
export const getTransformations = (
  currTrans: CameraTransformations,
  [w, h]: [number, number],
  transGen?: CameraTransformationHandlers
): CameraTransformations => {
  return {
    view:
      transGen && transGen.view
        ? transGen.view(currTrans.view)
        : Transform.lookAt(
            Point.fromValues(-5.0, -5.0, -5.0), // eye
            Point.fromValues(0, 0, 0), // target
            UnitVector.fromValues(0, 0, 1) // vup
          ),
    projection:
      transGen && transGen.projection
        ? transGen.projection(currTrans.projection) // Compose the current projection with the new one from transGen
        : Transform.perspective(Math.PI / 5, w / h, 0.1, 100.0),
  };
};

export const logN = (n: number, base: number) => Math.log(n) / Math.log(base);

export const zeroHex = (num: number, places: number): string => num.toString(16).padStart(places, '0');

export const notNull = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;