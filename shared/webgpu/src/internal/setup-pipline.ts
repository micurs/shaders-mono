import { Gpu } from '../gpu-connection';
import { GPUPipeline, Material, Scene } from '../types';
import { createColorsBindingGroup, createTextureBindingGroup, createTransformationsBindingGroup } from './binding';

type PipelineLayoutData = [GPUPipelineLayout, GPUBindGroup[], GPUBuffer[]];

/**
 * Create the pipeline layout for the a primitive object in the scene.
 * @param gpu - The current GPU connection
 * @param material - The material for the object
 * @param type - The type of pipeline to create
 * @returns
 */
const createPipelineLayout = (gpu: Gpu, material: Material | undefined): PipelineLayoutData => {
  const { device } = gpu;
  // Group 0: Transformations
  const [layout0, group0, buffer0] = createTransformationsBindingGroup(gpu);
  // Group 1: colors
  const [layout1, group1, buffer1] = createColorsBindingGroup(gpu);
  // Group 2: texture, and sampler
  const [layout2, group2] = material ? createTextureBindingGroup(gpu, material!) : [undefined, undefined];

  const bindGroupLayouts = layout2 ? [layout0, layout1, layout2] : [layout0, layout1];
  const groups = group2 ? [group0, group1, group2] : [group0, group1];
  const buffers = [buffer0, buffer1];

  const pipelineLayout = device.createPipelineLayout({ bindGroupLayouts });

  return [pipelineLayout, groups, buffers];
};

/**
 * Create all the necessary pipelines for the rendering all the objects in the scene.
 * @param gpu - The current GPU connection
 * @param shaderModule - The shader module
 * @param scene - The scene with all the object we want to render
 * @returns
 */
export const createPipelines = (gpu: Gpu, shaderModule: GPUShaderModule, scene: Scene): GPUPipeline[] => {
  const { device, format } = gpu;

  return scene.map(([triangleMesh, material]) => {
    const type = material ? 'texturePipeline' : 'colorPipeline';

    const [pipelineLayout, groups, buffers] = createPipelineLayout(gpu, material);

    // Create the render pipeline and decide which shaders to use.
    const regPipelineData: GPURenderPipelineDescriptor = {
      label: type,
      layout: pipelineLayout,
      vertex: {
        module: shaderModule,
        entryPoint: type === 'texturePipeline' ? 'vertexTextureShader' : 'vertexColorShader',
        buffers: [triangleMesh.bufferLayout],
      },
      fragment: {
        module: shaderModule,
        entryPoint: type === 'texturePipeline' ? 'fragmentTextureShader' : 'fragmentColorShader',
        targets: [{ format }],
      },
      primitive: {
        topology: triangleMesh.primitives, // 'triangle-list',
        cullMode: 'back',
      },
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus',
      },
    };
    const pipeline = device.createRenderPipeline(regPipelineData);
    const altPipelineData: GPURenderPipelineDescriptor = {
      ...regPipelineData,
      label: `${type}-alt`,
      primitive: {
        topology: 'line-list',
        cullMode: 'none',
      },
    };
    const altPipeline = device.createRenderPipeline(altPipelineData);

    return {
      type,
      pipeline,
      altPipeline,
      triangleMesh,
      uniformBuffers: buffers,
      bindGroups: groups,
    };
  });
};
