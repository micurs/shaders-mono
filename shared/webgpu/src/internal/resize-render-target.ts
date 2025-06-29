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

    // Destroy old textures before creating new ones
    gpu['_colorTexture']?.destroy();
    gpu['_depthTexture']?.destroy();

    // Recreate textures and assign to gpu instance
    gpu['_depthTexture'] = device.createTexture({
      label: 'DepthTexture',
      sampleCount: 1,
      size: [w, h, 1],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });

    gpu['_colorTexture'] = device.createTexture({
      label: 'ColorTexture',
      size: { width: w, height: h, depthOrArrayLayers: 1 },
      sampleCount: 1,
      format: gpu.format,
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });

    // Update the render descriptor with the new texture views
    const colors = renderDescriptor.colorAttachments! as GPURenderPassColorAttachment[];
    colors[0]!.view = gpu['_colorTexture'].createView({ label: 'ColorView' });
    const depth = renderDescriptor.depthStencilAttachment! as GPURenderPassDepthStencilAttachment;
    depth.view = gpu['_depthTexture'].createView({ label: 'DepthView' });

    return renderDescriptor;
  };

  return viewTexture;
};
