import { Gpu } from '../gpu-connection';
import { GeoBuilder, GPUPipeline } from '../types';
import { createColorsBindingGroup, createTextureBindingGroup, createTransformationsBindingGroup } from './binding';
import { styleColorToGpu } from './utils';

export const createPipeline = async (gpu: Gpu, shaderModule: GPUShaderModule, geoBuilder: GeoBuilder): Promise<GPUPipeline> => {
  const [triangleMesh, material] = geoBuilder(gpu);
  const { device, format } = gpu;

  // Group 0: Transformations
  const [layout0, group0, buffer0] = createTransformationsBindingGroup(gpu);
  // Group 1: colors
  const [layout1, group1, buffer1] = createColorsBindingGroup(gpu);
  // Group 2: texture, and sampler
  const [layout2, group2] = material ? createTextureBindingGroup(gpu, material) : [undefined, undefined];

  const pipelineLayout = layout2
    ? device.createPipelineLayout({
        bindGroupLayouts: [layout0, layout1, layout2],
      })
    : device.createPipelineLayout({
        bindGroupLayouts: [layout0, layout1],
      });

  // Create the render pipeline and decide which shaders to use.
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
  const clearColor = styleColorToGpu(window.getComputedStyle(gpu.canvas).backgroundColor);
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
    uniformBuffers: [buffer0, buffer1],
    bindGroups: [group0, group1, group2],
    renderPassDescription: renderPassDescription as GPURenderPassDescriptor,
  };
};
