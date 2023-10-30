import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { TriangleData } from '.';

export type RGBAColor = [number, number, number, number];

// export type GeoBuilder = (gpu: Gpu) => [TriangleMesh, Material?];

export interface GPUConnection {
  readonly canvas: HTMLCanvasElement;
  readonly context: GPUCanvasContext;
  readonly device: GPUDevice;
  readonly format: GPUTextureFormat;
}

export interface TriangleMesh {
  buffer: GPUBuffer | null;
  bufferLayout: GPUVertexBufferLayout | null;
  vertexCount: number;
  byteSize: number;
  color: RGBAColor;
  primitives: GPUPrimitiveTopology;
}

export interface Material {
  texture: GPUTexture | undefined;
  view: GPUTextureView | undefined;
  sampler: GPUSampler | undefined;
}

export type PredefinedShaders = 'standard-3d' | 'standard-2d';

export type Shaders = PredefinedShaders | { source: string };

export interface GPUPipeline {
  type: 'colorPipeline' | 'texturePipeline';
  pipeline: GPURenderPipeline;
  altPipeline: GPURenderPipeline;
  triangleMesh: TriangleMesh; // To be replaced with a more generic triangle mesh structure!
  uniformBuffers: Array<Array<GPUBuffer>>;
  bindGroups: Array<GPUBindGroup | undefined>;
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

export type Scene = Array<[TriangleData, Material?]>;

export interface DirectionalLight {
  dir: UnitVector;
  col: RGBAColor;
}

export interface PointLight {
  pos: Point;
  col: RGBAColor;
}
