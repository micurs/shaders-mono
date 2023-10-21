import { DataGen, GPUConnection, GPUPipeline } from '../types';

export const createPipeline = async (
  tmGen: DataGen,
  gpu: GPUConnection,
  shaderModule: GPUShaderModule
): Promise<GPUPipeline> => {
  const [triangleMesh, material] = await tmGen(gpu);
  const { device, format } = gpu;

  // Set the vertices
  const uniformBuffer = device.createBuffer({
    size: 4 * 16 * 3,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX,
        buffer: {
          type: 'uniform',
        },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: {},
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        sampler: {},
      },
    ],
  });
  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
      {
        binding: 0,
        resource: { buffer: uniformBuffer },
      },
      {
        binding: 1,
        resource: material.view!,
      },
      {
        binding: 2,
        resource: material.sampler!,
      },
    ],
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });

  const pipeline = device.createRenderPipeline({
    layout: pipelineLayout,
    vertex: {
      module: shaderModule,
      entryPoint: 'vs_main',
      buffers: [triangleMesh.bufferLayout], // TODO: here add normals buffer layout: triangleMesh.
    },
    fragment: {
      module: shaderModule,
      entryPoint: 'fs_main',
      targets: [{ format }],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'none',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus',
    },
  });

  // Create the Z-buffer to hold depth values for each pixel and control the render pass.
  let textureView = gpu.context.getCurrentTexture().createView();
  const depthTexture = device.createTexture({
    size: [gpu.canvas.width, gpu.canvas.height, 1],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  const renderPassDescription = {
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r: 0.2, g: 0.247, b: 0.314, a: 0.0 }, //background color
        //loadValue: { r: 0.2, g: 0.247, b: 0.314, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
    depthStencilAttachment: {
      view: depthTexture.createView(),
      depthClearValue: 1.0,
      depthLoadValue: 1.0,
      depthStoreOp: 'store',
      depthLoadOp: 'clear',
      /*stencilClearValue: 0,
          stencilLoadValue: 0,
          stencilStoreOp: "store",
          stencilLoadOp: 'clear'*/
    },
  };

  return {
    pipeline,
    triangleMesh,
    uniformBuffer,
    bindGroup,
    renderPassDescription: renderPassDescription as GPURenderPassDescriptor,
  };
};
