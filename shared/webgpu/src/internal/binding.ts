import { Transform, Vector, Point } from '@shaders-mono/geopro';
import { Gpu } from '../gpu-connection';
import { Material } from '../types';

// Group 0 (default): Transformations
export const createSceneDataBindingGroup = (gpu: Gpu): [GPUBindGroupLayout, GPUBindGroup, GPUBuffer[]] => {
  const transSize =
    3 * Transform.bufferSize + //  3 transformations
    2 * 4 + // 2 32 bit integer
    4 * (2 * Vector.bufferSize) + // 5 directional lights (direction + color)
    4 * (Vector.bufferSize + Point.bufferSize); // 20 point lights (position + color)

  const lightSize =
    4 * (2 * Vector.bufferSize) + // 2 directional lights (direction + color)
    4 * (Vector.bufferSize + Point.bufferSize); // 2 point lights (position + color)

  const transBuffer = gpu.device.createBuffer({
    label: 'TransBuffer',
    size: transSize + (transSize % 16),
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const lightBuffer = gpu.device.createBuffer({
    label: 'LightBuffer',
    size: lightSize + (lightSize % 16),
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  // Build the group layout (the equivalent of the type definition in the shader)
  const entries: GPUBindGroupLayoutEntry[] = [
    {
      binding: 0,
      visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
      buffer: {
        type: 'uniform',
      },
    },
    {
      binding: 1,
      visibility: GPUShaderStage.FRAGMENT,
      buffer: {
        type: 'uniform',
      },
    },
  ];
  const layout = gpu.device.createBindGroupLayout({ label: 'transformations', entries });

  // Build the group (the equivalent of the instance in the shader)
  const bindings: GPUBindGroupEntry[] = [
    {
      binding: 0,
      resource: { buffer: transBuffer },
    },
    {
      binding: 1,
      resource: { buffer: lightBuffer },
    },
  ];
  const group = gpu.device.createBindGroup({
    label: 'SceneData',
    layout: layout,
    entries: bindings,
  });
  return [layout, group, [transBuffer, lightBuffer]];
};

// Group 1: colors
export const createColorsBindingGroup = (gpu: Gpu): [GPUBindGroupLayout, GPUBindGroup, GPUBuffer[]] => {
  const buffer = gpu.device.createBuffer({
    size: 4 * 4, // 4 floats of 4 bytes each
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  // Build the group layout (the equivalent of the type definition in the shader)
  const entries: GPUBindGroupLayoutEntry[] = [
    {
      binding: 0,
      visibility: GPUShaderStage.FRAGMENT,
      buffer: {
        type: 'uniform',
      },
    },
  ];
  const layout = gpu.device.createBindGroupLayout({ label: 'color', entries });

  // Build the group (the equivalent of the instance in the shader)
  const bindings: GPUBindGroupEntry[] = [
    {
      binding: 0,
      resource: { buffer },
    },
  ];

  const group = gpu.device.createBindGroup({
    label: 'color',
    layout: layout,
    entries: bindings,
  });

  return [layout, group, [buffer]];
};

// Group 2: texture, and sampler
export const createTextureBindingGroup = (gpu: Gpu, material: Material): [GPUBindGroupLayout, GPUBindGroup] => {
  const entries: GPUBindGroupLayoutEntry[] = [
    {
      binding: 0,
      visibility: GPUShaderStage.FRAGMENT,
      texture: {},
    },
    {
      binding: 1,
      visibility: GPUShaderStage.FRAGMENT,
      sampler: {},
    },
  ];
  const layout = gpu.device.createBindGroupLayout({ label: 'texture', entries });

  // Build the group (the equivalent of the instance in the shader)
  const bindings: GPUBindGroupEntry[] = [
    {
      binding: 0,
      resource: material.view!,
    },
    {
      binding: 1,
      resource: material.sampler!,
    },
  ];

  const group = gpu.device.createBindGroup({
    label: 'texture',
    layout: layout,
    entries: bindings,
  });

  return [layout, group];
};
