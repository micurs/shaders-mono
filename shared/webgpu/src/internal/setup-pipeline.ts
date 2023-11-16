import { Gpu } from '../gpu-connection';
import { GPUPipeline, Material, Scene } from '../types';
import { createColorsBindingGroup, createTextureBindingGroup, createSceneDataBindingGroup, createModelTransBindingGroup } from './binding';

type PipelineBindingGroups = [GPUBindGroup, GPUBindGroup, GPUBindGroup, GPUBindGroup | undefined];
type PipelineBuffers = [GPUBuffer[], GPUBuffer[], GPUBuffer[]];

type PipelineLayoutData = [GPUPipelineLayout, PipelineBindingGroups, PipelineBuffers];

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
  // Group 2: model and inverse model transformation
  const [layout2, group2, buffer2] = createModelTransBindingGroup(gpu);

  // Group 3: texture, and sampler
  const [layout3, group3] = material ? createTextureBindingGroup(gpu, material!) : [undefined, undefined];

  const bindGroupLayouts = layout3 ? [layout0, layout1, layout2, layout3] : [layout0, layout1, layout2];
  const groups: PipelineBindingGroups = [group0, group1, group2, group3];
  const buffers: PipelineBuffers = [buffer0, buffer1, buffer2];

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
export const createPipelines = (gpu: Gpu, shaderModule: GPUShaderModule, scene: Scene<unknown>): Map<string, GPUPipeline> => {
  const { device, format } = gpu;

  const idGeoPairs = scene.map<[string, GPUPipeline]>(([geoRenderable, material]): [string, GPUPipeline] => {
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

    return [
      geoRenderable.id,
      {
        id: geoRenderable.id,
        type: geoRenderable.label,
        pipeline,
        altPipeline,
        geoRenderable,
        uniformBuffers: buffers,
        bindGroups: groups,
      },
    ];
  });
  return new Map<string, GPUPipeline>(idGeoPairs);
};
