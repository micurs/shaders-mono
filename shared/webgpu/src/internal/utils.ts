import { Gpu } from '../gpu-connection';
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
  // Create the Z-buffer to hold depth values for each pixel and control the render pass.
  const depthTexture = device.createTexture({
    size: [canvas.width, canvas.height, 1],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });
  const clearColor = styleColorToGpu(window.getComputedStyle(canvas).backgroundColor);
  const textureView = gpu.context.getCurrentTexture().createView();

  return {
    colorAttachments: [
      {
        view: textureView,
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
