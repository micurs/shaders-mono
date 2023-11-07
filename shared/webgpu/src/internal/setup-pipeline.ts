import { Gpu } from '../gpu-connection';
import { GPUPipeline, Material, Scene } from '../types';
import { createColorsBindingGroup, createTextureBindingGroup, createSceneDataBindingGroup } from './binding';

type PipelineLayoutData = [GPUPipelineLayout, GPUBindGroup[], GPUBuffer[][]];

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
  const [layout0, group0, buffer0] = createSceneDataBindingGroup(gpu);
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

  return scene.map(([geoRenderable, material]) => {
    // const type = material ? 'texturePipeline' : 'colorPipeline';

    const [pipelineLayout, groups, buffers] = createPipelineLayout(gpu, material);

    // Create the render pipeline and decide which shaders to use.
    const regPipelineData: GPURenderPipelineDescriptor = {
      label: geoRenderable.label,
      layout: pipelineLayout,
      multisample: {
        count: 1,
      },
      vertex: {
        module: shaderModule,
        entryPoint: geoRenderable.vertexShader,
        buffers: [geoRenderable.bufferLayout],
      },
      fragment: {
        module: shaderModule,
        entryPoint: geoRenderable.fragmentShader,
        targets: [
          {
            format: format,
            blend: {
              color: {
                srcFactor: 'src-alpha',
                dstFactor: 'one-minus-src-alpha',
                operation: 'add',
              },
              alpha: {
                srcFactor: 'src-alpha',
                dstFactor: 'one-minus-src-alpha',
                operation: 'add',
              },
            },
          },
        ],
      },
      primitive: {
        topology: geoRenderable.primitives,
        cullMode: geoRenderable.cullMode,
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
      label: `${geoRenderable.label}-alt`,
      primitive: {
        topology: 'line-list',
        cullMode: 'none',
      },
    };
    const altPipeline = device.createRenderPipeline(altPipelineData);

    return {
      type: geoRenderable.label,
      pipeline,
      altPipeline,
      geoRenderable,
      uniformBuffers: buffers,
      bindGroups: groups,
    };
  });
};
