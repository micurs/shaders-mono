import { Gpu } from '../gpu-connection';
import { GPUPipeline, Scene } from '../types';
import { createColorsBindingGroup, createTextureBindingGroup, createTransformationsBindingGroup } from './binding';

interface Pipelines {
  texturePipeline?: GPUPipeline;
  colorPipeline?: GPUPipeline;
}

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

    // Group 0: Transformations
    const [layout0, group0, buffer0] = createTransformationsBindingGroup(gpu);
    // Group 1: colors
    const [layout1, group1, buffer1] = createColorsBindingGroup(gpu);
    // Group 2: texture, and sampler
    const [layout2, group2] = type === 'texturePipeline' ? createTextureBindingGroup(gpu, material!) : [undefined, undefined];

    const pipelineLayout =
      type === 'texturePipeline'
        ? device.createPipelineLayout({
            bindGroupLayouts: [layout0, layout1, layout2!],
          })
        : device.createPipelineLayout({
            bindGroupLayouts: [layout0, layout1],
          });

    // Create the render pipeline and decide which shaders to use.
    const pipeline = device.createRenderPipeline({
      label: type,
      layout: pipelineLayout,
      vertex: {
        module: shaderModule,
        entryPoint: type === 'texturePipeline' ? 'vertexTextureShader' : 'vertexColorShader',
        buffers: [triangleMesh.bufferLayout], // TODO: here add normals buffer layout: triangleMesh.
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
    });

    return {
      type,
      pipeline,
      triangleMesh,
      uniformBuffers: [buffer0, buffer1],
      bindGroups: [group0, group1, group2],
    };
  });
};
