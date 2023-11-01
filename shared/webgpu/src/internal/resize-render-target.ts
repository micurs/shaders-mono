import { Gpu } from '../gpu-connection';

export const initRebuildViewTexture = (gpu: Gpu) => {
  const { canvas, context, device } = gpu;
  let [w, h] = [canvas.width, canvas.height];

  const observer = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    [w, h] = [Math.round(width), Math.round(height)];
    console.log('WebGPU:resize canvas w=', w);
  });
  observer.observe(canvas.parentElement!);

  const viewTexture = (renderDescriptor: GPURenderPassDescriptor): GPURenderPassDescriptor => {
    if (w === canvas.width && h === canvas.height && renderDescriptor) {
      const colorTexture = context.getCurrentTexture();
      const colors = renderDescriptor.colorAttachments! as GPURenderPassColorAttachment[];
      colors[0]!.view = colorTexture.createView();

      return renderDescriptor;
    }
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    // New Z-buffer to hold depth values for each pixel and control the render pass.
    const depthTexture = device.createTexture({
      label: 'DepthTexture',
      size: [canvas.width, canvas.height, 1],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });

    // New Color buffer to hold color values for each pixel and control the render pass.
    const colorTexture = context.getCurrentTexture();

    const colors = renderDescriptor.colorAttachments! as GPURenderPassColorAttachment[];
    colors[0]!.view = colorTexture.createView();
    const depth = renderDescriptor.depthStencilAttachment! as GPURenderPassDepthStencilAttachment;
    depth.view = depthTexture.createView();

    return renderDescriptor;
  };

  return viewTexture;
};
