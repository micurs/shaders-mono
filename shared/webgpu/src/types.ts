import { Transform } from '@shaders-mono/geopro';
import { Gpu } from './gpu-connection';

export type GeoBuilder = (gpu: Gpu) => [TriangleMesh, Material];

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
  size: number;
}

export interface Material {
  texture: GPUTexture | undefined;
  view: GPUTextureView | undefined;
  sampler: GPUSampler | undefined;
}

export type PredefinedShaders = 'standard-3d' | 'standard-2d';

export type Shaders = PredefinedShaders | { source: string };


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

export type MouseMoveHandler = (bt: number, r: MouseMovement, p: MouseLocation) => void;
export type MouseClickHandler = (bt: number, p: MouseLocation) => void;
export type MouseZoomHandler = (delta: number) => void;
export type TransformHandler = (prev?: Transform) => Transform;

export interface TransCbs {
  view?: TransformHandler;
  model?: TransformHandler;
  projection?: TransformHandler;
}

export type MouseLocation = [number, number];
export type MouseDirection = [number, number];

export type MouseMovement = {
  origin: MouseLocation;
  direction: MouseDirection;
};

export interface MouseCbs {
  move?: MouseMoveHandler;
  click?: MouseClickHandler;
  zoom?: MouseZoomHandler;
}
