/// <reference types="@webgpu/types" />

/**
 * Create a WebGPU texture material from an ImageBitmap
 * @param gpu - the current GPU connection
 * @param image - the image to be used as a texture
 * @returns
 */
export declare const createTexture: (gpu: Gpu, image: ImageBitmap) => Promise<Material>;

/**
 * Create a triangle mesh from a given triangle data, that is GPUBuffer and GPUVertexBufferLayout for WebGpu
 * @param gpu - The current GPU connection
 * @param trimesh - The triangle data as a TriangleData object
 * @returns a TriangleMesh object with the WebGPU buffer and layout
 */
export declare const createTriangleMesh: (gpu: Gpu, trimesh: TriangleData) => TriangleMesh;

declare type GeoBuilder = (device: GPUConnection) => [TriangleMesh, Material];

declare class Gpu implements GPUConnection {
    readonly canvas: HTMLCanvasElement;
    readonly context: GPUCanvasContext;
    readonly device: GPUDevice;
    readonly format: GPUTextureFormat;
    private _shaderModule;
    private _pipeline;
    private _transformations;
    private constructor();
    static build(canvas: HTMLCanvasElement): Promise<Gpu>;
    get pipeline(): GPUPipeline | undefined;
    setupShaders(shaders: Shaders): Promise<void>;
    /**
     * Setup the GeoBuilder
     * @param geoBuilder
     * @returns
     */
    setupGeoBuilder(geoBuilder: GeoBuilder): Promise<void>;
    /**
     * render the scene
     * @param transf
     * @returns none
     * @private
     */
    private render;
    private renderLoop;
    beginRenderLoop(): void;
}

declare interface GPUConnection {
    readonly canvas: HTMLCanvasElement;
    readonly context: GPUCanvasContext;
    readonly device: GPUDevice;
    readonly format: GPUTextureFormat;
}

declare interface GPUPipeline {
    pipeline: GPURenderPipeline;
    triangleMesh: TriangleMesh;
    uniformBuffer: GPUBuffer;
    bindGroup: GPUBindGroup;
    renderPassDescription: GPURenderPassDescriptor;
}

/**
 * Initialize the WebGPU connection
 * @param canvas - the canvas to be used for the WebGPU connection
 * @returns a Promise with the GPU connection
 */
export declare const initialize: (canvas: HTMLCanvasElement) => Promise<Gpu>;

declare interface Material {
    texture: GPUTexture | undefined;
    view: GPUTextureView | undefined;
    sampler: GPUSampler | undefined;
}

declare type PredefinedShaders = 'standard-3d' | 'standard-2d';

declare type Shaders = PredefinedShaders | {
    source: string;
};

/**
 * TriangleData is a class that holds the data for triangles, its colors, normals and texture coordinates.
 */
declare class TriangleData {
    private _vertices;
    private _colors;
    private _normals;
    private _textures;
    private _vertexSize;
    get vertexCount(): number;
    get vertexSize(): number;
    get byteSize(): number;
    get vertices(): Float32Array;
    get layouts(): GPUVertexAttribute[];
    constructor(vertices: Float32Array, vertexSize: number);
    addColors(colors: Float32Array): void;
    addNormals(normals: Float32Array): void;
    addTextures(textures: Float32Array): void;
}

declare interface TriangleMesh {
    buffer: GPUBuffer;
    bufferLayout: GPUVertexBufferLayout;
    vertexCount: number;
}

export { }
