import { Transform } from '@shaders-mono/geopro';

export interface GPUConnection {
  readonly canvas: HTMLCanvasElement;
  readonly context: GPUCanvasContext;
  readonly device: GPUDevice;
  readonly format: GPUTextureFormat;
}

export interface TriangleMesh {
  buffer: GPUBuffer;
  bufferLayout: GPUVertexBufferLayout;
  vertexCount: number;
}

export interface Material {
  gpu: GPUConnection;
  texture: GPUTexture | undefined;
  view: GPUTextureView | undefined;
  sampler: GPUSampler | undefined;
}

export type PredefinedShaders = 'standard-3d' | 'standard-2d';

export type Shaders = PredefinedShaders | { source: string };

export type DataGen = (device: GPUConnection) => Promise<[TriangleMesh, Material]>;

export interface GPUPipeline {
  pipeline: GPURenderPipeline;
  triangleMesh: TriangleMesh; // To be replaced with a more generic triangle mesh structure!
  uniformBuffer: GPUBuffer;
  bindGroup: GPUBindGroup;
  renderPassDescription: GPURenderPassDescriptor;
}

export interface GpuTransformations {
  projection: Transform;
  view: Transform;
  model: Transform;
}

export interface TransGen {
  view?: (prev: Transform) => Transform;
  model?: (prev: Transform) => Transform;
  projection?: (prev: Transform) => Transform;
}
