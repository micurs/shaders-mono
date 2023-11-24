import { Transform, Vector, Point } from '@shaders-mono/geopro';
import { Gpu } from '../gpu-connection';
import { Material } from '../types';
import { notNull } from './utils';

// Group 0 (default): Transformations
export const createSceneDataBindingGroup = (gpu: Gpu): [GPUBindGroupLayout, GPUBindGroup, GPUBuffer[]] => {
  const transSize =
    3 * Transform.bufferSize + //  3 transformations
    2 * 4 + // 2 32 bit integer
    4 * (2 * Vector.bufferSize) + // 5 directional lights (direction + color)
    4 * (Vector.bufferSize + Point.bufferSize); // 20 point lights (position + color)

  const numberOfLights = 4;
  const lightSize =
    numberOfLights * (2 * Vector.bufferSize) + // 2 directional lights (direction + color)
    numberOfLights * (Vector.bufferSize + Point.bufferSize) + // 2 point lights (position + color)
    4 * 4; // 4 32 bit floating point (4 byte each);

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

// Group 2
export const createModelTransBindingGroup = (gpu: Gpu): [GPUBindGroupLayout, GPUBindGroup, GPUBuffer[]] => {
  const transSize = 2 * Transform.bufferSize; // 2 transformations
  const transBuffer = gpu.device.createBuffer({
    label: 'TransBuffer',
    size: transSize + (transSize % 16),
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  const entries: GPUBindGroupLayoutEntry[] = [
    {
      binding: 0,
      visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
      buffer: {
        type: 'uniform',
      },
    },
  ];
  const layout = gpu.device.createBindGroupLayout({ label: 'modelTransf', entries });

  // Build the group (the equivalent of the instance in the shader)
  const bindings: GPUBindGroupEntry[] = [
    {
      binding: 0,
      resource: { buffer: transBuffer },
    },
  ];
  const group = gpu.device.createBindGroup({
    label: 'SceneData',
    layout: layout,
    entries: bindings,
  });
  return [layout, group, [transBuffer]];
};

// Group 1: colors
export const createColorsBindingGroup = (gpu: Gpu): [GPUBindGroupLayout, GPUBindGroup, GPUBuffer[]] => {
  const colorBuffer = gpu.device.createBuffer({
    size: 4 * 4, // 4 floats of 4 bytes each
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  const textureMixBuffer = gpu.device.createBuffer({
    size: 4, //  1 32 bit float
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
    {
      binding: 1,
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
      resource: { buffer: colorBuffer },
    },
    {
      binding: 1,
      resource: { buffer: textureMixBuffer },
    },
  ];

  const group = gpu.device.createBindGroup({
    label: 'color',
    layout: layout,
    entries: bindings,
  });

  return [layout, group, [colorBuffer, textureMixBuffer]];
};

// Group 2: texture, and sampler
export const createTextureBindingGroup = (gpu: Gpu, material: Material): [GPUBindGroupLayout, GPUBindGroup] => {
  const { device } = gpu;

  // Create the Sampler to get the image from the texture using u,v coordinates
  const samplerDescriptor: GPUSamplerDescriptor = {
    addressModeU: 'repeat',
    addressModeV: 'repeat',
    magFilter: 'linear',
    minFilter: 'nearest',
    mipmapFilter: 'linear',
    maxAnisotropy: 1,
  };
  const sampler = device.createSampler(samplerDescriptor);
  const availableViews = material.views.filter(notNull);
  const entries: GPUBindGroupLayoutEntry[] = [
    ...availableViews.map<GPUBindGroupLayoutEntry>((_, idx) => ({
      binding: idx,
      visibility: GPUShaderStage.FRAGMENT,
      texture: { sampleType: 'float' },
    })),
    { binding: 4, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'filtering' } },
  ];
  const layout = gpu.device.createBindGroupLayout({ label: 'texture', entries });

  // Build the group (the equivalent of the instance in the shader)
  const bindings: GPUBindGroupEntry[] = [
    ...availableViews.map((view, idx) => ({
      binding: idx,
      resource: view,
    })),
    {
      binding: 4,
      resource: sampler,
    },
  ];

  const group = gpu.device.createBindGroup({
    label: 'texture',
    layout: layout,
    entries: bindings,
  });

  return [layout, group];
};

