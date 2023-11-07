import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { GeoRenderable } from './geo-renderable';

export type RGBAColor = [number, number, number, number];

// export type GeoBuilder = (gpu: Gpu) => [TriangleMesh, Material?];

export interface GPUConnection {
  readonly canvas: HTMLCanvasElement;
  readonly context: GPUCanvasContext;
  readonly device: GPUDevice;
  readonly format: GPUTextureFormat;
}

export interface Renderable {
  buffers: GPUBuffer[];
  bufferLayout: GPUVertexBufferLayout | null;
  vertexCount: number;
  getByteSizePerStrip: (strip: number) => number;
  getVertexCountPerStrip(strip: number): number;
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
  type: string;
  pipeline: GPURenderPipeline;
  altPipeline: GPURenderPipeline;
  geoRenderable: Renderable; // To be replaced with a more generic triangle mesh structure!
  uniformBuffers: Array<Array<GPUBuffer>>;
  bindGroups: Array<GPUBindGroup | undefined>;
}

export interface CameraTransformations {
  projection: Transform;
  view: Transform;
}

export type MouseMoveHandler = (bt: number, r: MouseMovement, p: MouseLocation) => void;
export type MouseClickHandler = (bt: number, p: MouseLocation) => void;
export type MouseZoomHandler = (delta: number) => void;
export type TransformHandler = (prev?: Transform) => Transform;

export interface CameraTransformationHandlers {
  view?: TransformHandler;
  projection?: TransformHandler;
}

export type LightHandler<T extends DirectionalLight | PointLight> = (prev: Array<T>) => void;

export interface LightsTransformationHandlers {
  dirLights?: LightHandler<DirectionalLight>;
  posLights?: LightHandler<PointLight>;
}

export interface FrameHandlers {
  camera?: CameraTransformationHandlers;
  lights?: LightsTransformationHandlers;
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

export type Scene = Array<[GeoRenderable, Material?]>;

export interface DirectionalLight {
  dir: UnitVector;
  col: RGBAColor;
}

export interface PointLight {
  pos: Point;
  col: RGBAColor;
}

export type GeoOptions<T> = T & {
  color?: RGBAColor;
  texture?: GPUTexture;
};

export type GeoGenerator<T = {}> = (t: Transform, options: GeoOptions<T>) => GeoRenderable;