import { Transform, Vector, Rotation } from '@shaders-mono/geopro';
import { Gpu } from './gpu-connection';
import { createGPUBuffer } from './internal/utils';
import { GeoOptions, Material, ModelTransformHandler, Renderable, RGBAColor } from './types';
import { RotationTranslationScale } from 'shared/geopro/src/types';

const float32Size = 4;

/**
 * TriangleData is a class that holds the data for triangles, its colors, normals and texture coordinates.
 */
export class GeoRenderable<T = null> implements Renderable {
  private _body: T | null = null;
  private _id: string;
  private _bufferData: Float32Array[] | null = null;
  private _vertices: Float32Array[] = []; // 3 coordinates per vertex - 3 points for a triangle
  private _vertexColors: Float32Array[] = []; // 4 color components per vertex - 3 points for a triangle
  private _vertexNormals: Float32Array[] = []; // 3 coordinates per vertex - 3 points for a triangle
  private _vertexTextureCoords: Float32Array[] = []; // 2 coordinates per vertex - 3 points for a triangle

  private _stripColors: RGBAColor[] = []; // [1.0, 1.0, 1.0, 1.0]; // 4 color components per vertex - 3 points for a triangle
  private _textureAlpha: number = 1.0;

  private _vertexByteSize: number = 0;

  private _buffers: GPUBuffer[] = [];
  private _bufferLayout: GPUVertexBufferLayout | null = null;
  private _topology: GPUPrimitiveTopology = 'triangle-list';
  private _cullMode: GPUCullMode = 'back';

  private _material: Material | null = null;

  private _transformation: RotationTranslationScale = {
    rotation: Rotation.identity(),
    scale: Vector.fromValues(1, 1, 1),
    translation: Vector.fromValues(0, 0, 0),
  };

  get id(): string {
    return this._id;
  }

  get textureAlpha(): number {
    return this._textureAlpha;
  }

  get label(): string {
    return this._topology;
  }

  get translationVector(): Vector {
    return this._transformation.translation;
  }

  get orientationRotation(): Rotation {
    return this._transformation.rotation;
  }

  get scaleVector(): Vector {
    return this._transformation.scale;
  }

  get hasTextures() {
    return this._vertexTextureCoords.length > 0 && this._material !== null;
  }

  get material(): Material | null {
    return this._material;
  }

  get vertexShader() {
    if (this._topology === 'triangle-strip' || this._topology === 'triangle-list') {
      return this.hasTextures ? 'vertexTextureShader' : 'vertexColorShader';
    }
    return 'vertexLineShader';
  }

  get fragmentShader() {
    if (this._topology === 'triangle-strip' || this._topology === 'triangle-list') {
      return this.hasTextures ? 'fragmentTextureShader' : 'fragmentColorShader';
    }
    return 'fragmentLineShader';
  }

  get colors(): RGBAColor[] {
    return this._stripColors;
  }

  get primitives(): GPUPrimitiveTopology {
    return this._topology;
  }

  get cullMode(): GPUCullMode {
    if (this._topology === 'triangle-strip' || this._topology === 'triangle-list') {
      return this._cullMode;
    }
    return 'none';
  }

  get vertexCount() {
    return this._vertices.reduce((acc, vtx) => acc + vtx.length / 3, 0);
  }

  get body(): T | null {
    return this._body;
  }

  get transformation(): Transform {
    return Transform.fromRotationTranslationScale(
      this._transformation.rotation ?? Rotation.identity(),
      this._transformation.translation ?? Vector.fromValues(0, 0, 0),
      this._transformation.scale ?? Vector.fromValues(1, 1, 1)
    );
  }

  /**
   * Return the transformation matrix and the inverse of the transpose of the transformation matrix as a Float32Array
   */
  get transformationData(): Float32Array {
    const t = this.transformation;
    return new Float32Array([...t.values, ...t.transpose().invert().values]);
  }

  setMaterial(material: Material) {
    this._material = material;
  }

  setBody(body: T) {
    this._body = body;
    return this;
  }

  scale(v: Vector) {
    this._transformation.scale = this._transformation.scale.multiply(v);
    return this;
  }

  translate(v: Vector) {
    this._transformation.translation = this._transformation.translation.add(v);
    return this;
  }

  rotate(rt: Rotation) {
    this._transformation.rotation = this._transformation.rotation.compose(rt);
    return this;
  }

  rotoTranslate(rt: Rotation, mv: Vector) {
    const t = this._transformation;
    t.rotation = rt;
    t.translation = mv;
    return this;
  }

  transform(timeSpan: number, th: ModelTransformHandler) {
    this._transformation = th(timeSpan, this._transformation);
    return this;
  }

  getVertexCountPerStrip(strip: number): number {
    return this._vertices[strip].length / 3;
  }

  // The size of each vertex in the buffer as number of bytes!
  get vertexByteSize() {
    return this._vertexByteSize;
  }

  getByteSizePerStrip(strip: number = 0) {
    const size =
      this._vertices[strip].length * float32Size +
      (this._vertexColors.length > 0 ? this._vertexColors[strip].length * float32Size : 0) +
      (this._vertexNormals.length > 0 ? this._vertexNormals[strip].length * float32Size : 0) +
      (this._vertexTextureCoords.length > 0 ? this._vertexTextureCoords[strip].length * float32Size : 0);
    return size;
  }

  setCullMode(cullMode: GPUCullMode) {
    this._cullMode = cullMode;
    return this;
  }

  /**
   * Add vertices to the triangle data
   * @param vertices - The vertices to add
   */
  addVertices(vertices: Float32Array) {
    this._vertices.push(vertices);
  }

  /**
   * Get all the group of vertices as a Float32Array
   */
  getBufferData(): Float32Array[] {
    if (this._bufferData !== null) {
      return this._bufferData;
    }

    this._bufferData = this._vertices.map((vertices, idx) => {
      const fragments = [];
      for (let vi = 0, ci = 0, ni = 0, ti = 0; vi < vertices.length; vi += 3, ci += 4, ni += 3, ti += 2) {
        const fragment = [vertices[vi + 0], vertices[vi + 1], vertices[vi + 2]];
        if (this._vertexColors.length > idx) {
          fragment.push(this._vertexColors[idx][ci + 0]);
          fragment.push(this._vertexColors[idx][ci + 1]);
          fragment.push(this._vertexColors[idx][ci + 2]);
          fragment.push(this._vertexColors[idx][ci + 3]);
        }
        if (this._vertexTextureCoords.length > idx) {
          fragment.push(this._vertexTextureCoords[idx][ti + 0]);
          fragment.push(this._vertexTextureCoords[idx][ti + 1]);
        }
        if (this._vertexNormals.length > idx) {
          fragment.push(this._vertexNormals[idx][ni + 0]);
          fragment.push(this._vertexNormals[idx][ni + 1]);
          fragment.push(this._vertexNormals[idx][ni + 2]);
        }
        fragments.push(...fragment);
      }
      // console.log('fragments size', fragments.length, fragments.length * float32Size);
      return new Float32Array(fragments);
    });
    return this._bufferData;
  }

  get layouts(): GPUVertexAttribute[] {
    let shaderLocation = 0;
    let offset = 0;
    // Position
    const layouts: GPUVertexAttribute[] = [
      {
        shaderLocation,
        offset: 0,
        format: 'float32x3',
      },
    ];
    shaderLocation += 1;
    offset += 3 * float32Size; // advance 3 elements for the coordinates.

    // Colors
    if (this._vertexColors.length > 0) {
      layouts.push({
        shaderLocation,
        offset,
        format: 'float32x4',
      });
      shaderLocation += 1;
      offset += 4 * float32Size; // advance 4 elements for the color.
    }

    // Textures
    if (this._vertexTextureCoords.length > 0) {
      layouts.push({
        // UV
        shaderLocation,
        offset, // skip 3 elements for the coordinates.
        format: 'float32x2',
      });
      shaderLocation += 1;
      offset += 2 * float32Size; // advance 2 elements for the texture coordinates.
    }

    // Normals
    if (this._vertexNormals.length > 0) {
      layouts.push({
        // Normal
        shaderLocation,
        offset,
        format: 'float32x3',
      });
      shaderLocation += 1;
      offset += 3 * float32Size; // advance 3 elements for the normal.
    }

    return layouts;
  }

  get buffers(): GPUBuffer[] {
    return this._buffers;
  }

  get bufferLayout(): GPUVertexBufferLayout {
    if (this._bufferLayout === null) {
      throw new Error('TriangleData: Buffer layout is not available! - Did you call buildGpuBuffer() ?');
    }
    return this._bufferLayout;
  }

  constructor(id: string, topology: GPUPrimitiveTopology, options: GeoOptions<unknown>) {
    this._id = id;
    this._topology = topology;
    this._vertexByteSize = 3 * 4;
    this._stripColors = options.colors ?? [[0.0, 0.0, 0.0, 0.0]];
    this._textureAlpha = options.textureAlpha ?? 1.0;
  }

  buildGpuBuffer(gpu: Gpu) {
    this._buffers = this.getBufferData().map((data) => createGPUBuffer(gpu.device, data));
    this._bufferLayout = {
      arrayStride: this.vertexByteSize,
      attributes: this.layouts,
    };
  }

  addColors(colors: Float32Array) {
    if (this._vertexColors.length === 0) {
      this._vertexByteSize += 4 * 4;
    }
    this._vertexColors.push(colors);
  }

  addNormals(normals: Float32Array) {
    if (this._vertexNormals.length === 0) {
      this._vertexByteSize += 3 * 4;
    }
    this._vertexNormals?.push(normals);
  }

  addTextures(textures: Float32Array) {
    if (this._vertexTextureCoords.length === 0) {
      this._vertexByteSize += 2 * 4;
    }
    this._vertexTextureCoords.push(textures);
  }
}
