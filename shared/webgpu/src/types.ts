import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { GeoRenderable } from './geo-renderable';
import { RotationTranslationScale } from 'shared/geopro/src/types';

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
  colors: RGBAColor[];
  primitives: GPUPrimitiveTopology;
  transformationData: Float32Array; // 2  4by4 matrices containing the transformation data (direct and inverse)
}

export interface Material {
  name: string;
  texture: GPUTexture;
  view: GPUTextureView;
}

export type PredefinedShaders = 'standard-3d' | 'standard-2d';

export type Shaders = PredefinedShaders | { source: string };

export interface PipelineBuffers {
  sceneBuffers: GPUBuffer[];
  colorBuffers: GPUBuffer[];
  modelBuffers: GPUBuffer[];
}

export interface PipelineBindingGroups {
  sceneGroup: GPUBindGroup;
  colorGroup: GPUBindGroup;
  modelGroup: GPUBindGroup;
  texturesGroup: GPUBindGroup | undefined;
}

export type PipelineLayoutData = [GPUPipelineLayout, PipelineBindingGroups, PipelineBuffers];

export interface GPUPipeline {
  id: string;
  type: string;
  pipeline: GPURenderPipeline;
  altPipeline: GPURenderPipeline;
  geoRenderable: GeoRenderable<unknown>; // The geometry to render
  uniformBuffers: PipelineBuffers;
  bindGroups: PipelineBindingGroups;
}

export interface CameraTransformations {
  projection: Transform;
  view: Transform;
}

export type MouseMoveHandler = (bt: MouseButton, r: MouseMovement, p: MouseLocation) => void;
export type MouseClickHandler = (bt: MouseButton, p: MouseLocation) => void;
export type MouseZoomHandler = (delta: number) => void;
export type TransformHandler = (prev?: Transform) => Transform;

export interface CameraTransformationHandlers {
  view?: TransformHandler;
  projection?: TransformHandler;
}

export type LightHandler<T extends DirectionalLight | PointLight> = (ts: number, prev: Array<T>) => void;

export type ModelTransformHandler = (timespan: number, prev: RotationTranslationScale) => RotationTranslationScale;

export interface LightsTransformationHandlers {
  dirLights?: LightHandler<DirectionalLight>;
  posLights?: LightHandler<PointLight>;
}

export interface ModelTransformationHandlers {
  [id: string]: ModelTransformHandler;
}

export interface FrameHandlers {
  camera?: CameraTransformationHandlers;
  lights?: LightsTransformationHandlers;
  models?: ModelTransformationHandlers;
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
  tilt?: MouseZoomHandler;
}

export type Scene<B = null> = Array<GeoRenderable<B>>;

export interface DirectionalLight {
  dir: UnitVector;
  col: RGBAColor;
}

export interface PointLight {
  pos: Point;
  col: RGBAColor;
}

export type GeoOptions<T> = T & {
  id: string; // A unique ID in the scene
  colors?: RGBAColor[];
  textureCoordinates?: boolean; // If true, texture coordinates will be generated
  alpha?: number; // If set, the alpha channel of the texture will be set to this value (otherwise 1.0)
  bumpIntensity?: number; // If set, the bump intensity for bump mapping
  bumpPrecision?: number; // Precision for bump mapping, default is 2.0
};

// export type GeoGenerator = <B, O = {}>(t: Transform, options: GeoOptions<O>) => GeoRenderable<B>;

export interface GeoGenerator<B, O = {}> {
  (t: Transform, options: GeoOptions<O>): GeoRenderable<B>;
}

export type MouseButton = 'none' | 'mouse-0' | 'mouse-1' | 'mouse-2' | 'ctrl-mouse-0' | 'ctrl-mouse-1' | 'ctrl-mouse-2';

export interface Dimension {
  w: number;
  h: number;
}

export interface TextureCoordinate {
  u: number;
  v: number;
}

export interface TextureWindow {
  pos: TextureCoordinate;
  size: Dimension;
}