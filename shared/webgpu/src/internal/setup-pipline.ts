import { Gpu } from '../gpu-connection';
import { GeoBuilder, GPUPipeline } from '../types';
import { styleColorToGpu } from './utils';

export const createPipeline = async (gpu: Gpu, shaderModule: GPUShaderModule, geoBuilder: GeoBuilder): Promise<GPUPipeline> => {
  const [triangleMesh, material] = geoBuilder(gpu);
  const { device, format } = gpu;

  // Create the uniform buffer to hold the transformation matrix.
  const uniformBuffer = device.createBuffer({
    size: 4 * 16 * 4, // 4 matrices of 4x4 floats of 4 bytes each
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const layoutEntries: GPUBindGroupLayoutEntry[] = [
    {
      binding: 0,
      visibility: GPUShaderStage.VERTEX,
      buffer: {
        type: 'uniform',
      },
    },
  ];
  if (material) {
    layoutEntries.push(
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: {},
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        sampler: {},
      }
    );
  }
  const bindGroupLayout = device.createBindGroupLayout({
    entries: layoutEntries,
  });

  const bindings: GPUBindGroupEntry[] = [
    {
      binding: 0,
      resource: { buffer: uniformBuffer },
    },
  ];
  if (material) {
    bindings.push(
      {
        binding: 1,
        resource: material.view!,
      },
      {
        binding: 2,
        resource: material.sampler!,
      }
    );
  }
  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: bindings,
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });

  const pipeline = device.createRenderPipeline({
    layout: pipelineLayout,
    vertex: {
      module: shaderModule,
      entryPoint: material ? 'vertexTextureShader' : 'vertexColorShader',
      buffers: [triangleMesh.bufferLayout], // TODO: here add normals buffer layout: triangleMesh.
    },
    fragment: {
      module: shaderModule,
      entryPoint: material ? 'fragmentTextureShader' : 'fragmentColorShader',
      targets: [{ format }],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'back',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus',
    },
  });

  // Create the Z-buffer to hold depth values for each pixel and control the render pass.
  const depthTexture = device.createTexture({
    size: [gpu.canvas.width, gpu.canvas.height, 1],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  let textureView = gpu.context.getCurrentTexture().createView();
  const clearColor = styleColorToGpu(
    window.getComputedStyle(gpu.canvas).backgroundColor
  );
  const renderPassDescription: GPURenderPassDescriptor = {
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

  return {
    pipeline,
    triangleMesh,
    uniformBuffer,
    bindGroup,
    renderPassDescription: renderPassDescription as GPURenderPassDescriptor,
  };
};
