import { Gpu } from '../gpu-connection';

export const initRebuildViewTexture = (gpu: Gpu) => {
  const { canvas, context, device } = gpu;
  let [w, h] = [canvas.width, canvas.height];

  // Recompute the [w,h] pair based on the dimension of the canvas container.
  const observer = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    [w, h] = [Math.round(width), Math.round(height)];
  });
  observer.observe(canvas.parentElement!);

  const viewTexture = (renderDescriptor: GPURenderPassDescriptor): GPURenderPassDescriptor => {
    if (w === canvas.width && h === canvas.height) {
      const colorTexture = context.getCurrentTexture();
      const colors = renderDescriptor.colorAttachments! as GPURenderPassColorAttachment[];
      colors[0]!.view = colorTexture.createView({ label: 'ColorView' });
      return renderDescriptor;
    }
    canvas.width = w;
    canvas.height = h;
    // canvas.style.width = w + 'px';
    // canvas.style.height = h + 'px';

    // New Z-buffer to hold depth values for each pixel and control the render pass.
    const depthTexture = device.createTexture({
      label: 'DepthTexture',
      sampleCount: 1,
      size: [w, h, 1],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });

    // New Color buffer to hold color values for each pixel and control the render pass.
    // const colorTexture = context.getCurrentTexture();
    const colorTexture = device.createTexture({
      label: 'ColorTexture',
      size: { width: w, height: h, depthOrArrayLayers: 1 },
      sampleCount: 1, // match the sample count to the pipeline
      format: 'bgra8unorm',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    const colors = renderDescriptor.colorAttachments! as GPURenderPassColorAttachment[];
    colors[0]!.view = colorTexture.createView({ label: 'ColorView' });
    const depth = renderDescriptor.depthStencilAttachment! as GPURenderPassDepthStencilAttachment;
    depth.view = depthTexture.createView({ label: 'DepthView' });

    return renderDescriptor;
  };

  return viewTexture;
};
