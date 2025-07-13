import { Gpu } from '../gpu-connection';
import { GPUPipeline, Material, PipelineBindingGroups, PipelineBuffers, PipelineLayoutData, Scene } from '../types';
import { createColorsBindingGroup, createTextureBindingGroup, createSceneDataBindingGroup, createModelTransBindingGroup } from './binding';

/**
 * Create the pipeline layout for the a primitive object in the scene.
 * @param gpu - The current GPU connection
 * @param material - The material for the object
 * @param type - The type of pipeline to create
 * @returns
 */
const createPipelineLayout = (gpu: Gpu, materials: Material[], environmentMaterial?: Material): PipelineLayoutData => {
  const { device } = gpu;
  // Group 0: Transformations
  const [sceneLayout, sceneGroup, sceneBuffers] = createSceneDataBindingGroup(gpu);
  // Group 1: colors
  const [colorLayout, colorGroup, colorBuffers] = createColorsBindingGroup(gpu);
  // Group 2: model and inverse model transformation
  const [modelLayout, modelGroup, modelBuffers] = createModelTransBindingGroup(gpu);

  // Group 3: texture, and sampler
  // Always create texture binding group if we have materials OR environment material
  const needsTextureBindings = materials.length > 0 || environmentMaterial !== undefined;
  const [texturesLayout, texturesGroup] = needsTextureBindings
    ? createTextureBindingGroup(gpu, materials, environmentMaterial)
    : [undefined, undefined];

  const bindGroupLayouts = texturesLayout
    ? [sceneLayout, colorLayout, modelLayout, texturesLayout] // If we have texture bindings
    : [sceneLayout, colorLayout, modelLayout];

  const groups: PipelineBindingGroups = {
    sceneGroup,
    colorGroup,
    modelGroup,
    texturesGroup,
  };
  const buffers: PipelineBuffers = { sceneBuffers, colorBuffers, modelBuffers };

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
export const createPipelines = (gpu: Gpu, shaderModule: GPUShaderModule, scene: Scene<unknown>, environmentMaterial?: Material): Map<string, GPUPipeline> => {
  const { device, format } = gpu;

  const idGeoPairs = scene.map<[string, GPUPipeline]>((geoRenderable): [string, GPUPipeline] => {
    const [pipelineLayout, groups, buffers] = createPipelineLayout(gpu, geoRenderable.materials, environmentMaterial);

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
        depthWriteEnabled: geoRenderable.fragmentShader !== 'fragmentEnvironmentShader', // Don't write depth for environment
        depthCompare: geoRenderable.fragmentShader === 'fragmentEnvironmentShader' ? 'always' : 'less', // Always pass depth test for environment
        format: 'depth24plus',
      },
    };
    const pipeline = device.createRenderPipeline(regPipelineData);
    const altPipelineData: GPURenderPipelineDescriptor = {
      ...regPipelineData,
      // vertex: {
      //   ...regPipelineData.vertex,
      //   entryPoint: 'vertexLineShader',
      // },
      // fragment: {
      //   ...regPipelineData.fragment!,
      //   entryPoint: 'fragmentLineShader',
      // },
      label: `${geoRenderable.label}-alt`,
      primitive: {
        topology: geoRenderable.primitives === 'line-list' ? geoRenderable.primitives : 'line-strip',
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
