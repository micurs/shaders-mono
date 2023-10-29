import { Gpu } from '../gpu-connection';
import { GPUPipeline, Scene } from '../types';
import { createColorsBindingGroup, createTextureBindingGroup, createTransformationsBindingGroup } from './binding';

/**
 * Create all the necessary pipelines for the rendering all the objects in the scene.
 * @param gpu - The current GPU connection
 * @param shaderModule - The shader module
 * @param scene - The scene with all the object we want to render
 * @returns
 */
export const createPipelines = async (gpu: Gpu, shaderModule: GPUShaderModule, scene: Scene): Promise<GPUPipeline[]> => {
  const [triangleMesh, material] = scene[0]!;
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
      topology: triangleMesh.primitives, // 'triangle-list',
      cullMode: 'back',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus',
    },
  });

  return [
    {
      pipeline,
      triangleMesh,
      uniformBuffers: [buffer0, buffer1],
      bindGroups: [group0, group1, group2],
    },
  ];
};
