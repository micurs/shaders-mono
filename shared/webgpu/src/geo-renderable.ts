import { Transform, Vector, Rotation } from '@shaders-mono/geopro';
import { Gpu } from './gpu-connection';
import { createGPUBuffer } from './internal/utils';
import { GeoOptions, Material, ModelTransformHandler, Renderable, RGBAColor } from './types';
import { RotationTranslationScale } from 'shared/geopro/src/types';

const float32Size = 4;

export interface MaterialProperties {
  alpha: number;
  bumpIntensity: number;
  bumpPrecision: number;
}

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
  private _vertexTangents: Float32Array[] = []; // 3 coordinates per vertex - 3 points for a triangle
  private _vertexTextureCoords: Float32Array[] = []; // 2 coordinates per vertex - 3 points for a triangle

  private _stripColors: RGBAColor[] = []; // [1.0, 1.0, 1.0, 1.0]; // 4 color components per vertex - 3 points for a triangle

  private _vertexByteSize = 0;

  private _buffers: GPUBuffer[] = [];
  private _bufferLayout: GPUVertexBufferLayout | null = null;
  private _topology: GPUPrimitiveTopology = 'triangle-list';
  private _cullMode: GPUCullMode = 'back';
  private _alpha = 1.0;
  private _bumpIntensity = 0.2; // Bump intensity for the texture
  private _bumpPrecision = 2; // Bump precision for the texture
  private _materials: Material[] = [];

  private _transformation: RotationTranslationScale = {
    rotation: Rotation.identity(), // Rotation of the object
    scale: Vector.fromValues(1, 1, 1),
    translation: Vector.fromValues(0, 0, 0),
  };

  private _transformationData: Float32Array;

  public display: 'none' | 'full' | 'no-texture' = 'full';

  get id(): string {
    return this._id;
  }

  get materialProperties(): MaterialProperties {
    return { alpha: this._alpha, bumpIntensity: this._bumpIntensity, bumpPrecision: this._bumpPrecision };
  }

  get label(): string {
    return this._topology;
  }

  get translationVector(): Vector {
    return this._transformation.translation ?? Vector.fromValues(0, 0, 0);
  }

  get orientationRotation(): Rotation {
    return this._transformation.rotation ?? Rotation.identity();
  }

  get scaleVector(): Vector {
    return this._transformation.scale ?? Vector.fromValues(1, 1, 1);
  }

  get hasTextures() {
    return this._vertexTextureCoords.length > 0 && this._materials.length > 0;
  }

  get materials(): Material[] {
    return this._materials;
  }

  get vertexShader() {
    if (this._topology === 'triangle-strip' || this._topology === 'triangle-list') {
      return this.hasTextures ? 'vertexTextureShader' : 'vertexColorShader';
    }
    return 'vertexLineShader';
  }

  get fragmentShader() {
    if (this._topology === 'triangle-strip' || this._topology === 'triangle-list') {
      if (this._materials.length == 2) {
        return 'fragmentTextureBumpShader'; // TODO: This should be controlled by an explicit setting when adding material
      }
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
    this._transformationData.set([...t.values]);
    this._transformationData.set([...t.transpose().invert().values], 16);
    return this._transformationData;
  }

  /**
   * Add a new material to the GeoRenderable and return its index as stored in the materials array.
   */
  addMaterial(material: Material): number {
    this._materials.push(material);
    return this.materials.length - 1;
  }

  setBody(body: T) {
    this._body = body;
    return this;
  }

  scale(v: Vector) {
    this._transformation.scale = this.scaleVector.multiply(v);
    return this;
  }

  translate(v: Vector) {
    this._transformation.translation = this.translationVector.add(v);
    return this;
  }

  rotate(rt: Rotation) {
    this._transformation.rotation = this.orientationRotation.compose(rt);
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
      (this._vertexTangents.length > 0 ? this._vertexTangents[strip].length * float32Size : 0) +
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
        if (this._vertexNormals.length > idx) {
          fragment.push(this._vertexNormals[idx][ni + 0]);
          fragment.push(this._vertexNormals[idx][ni + 1]);
          fragment.push(this._vertexNormals[idx][ni + 2]);
        }
        if (this._vertexTangents.length > idx) {
          fragment.push(this._vertexTangents[idx][ni + 0]);
          fragment.push(this._vertexTangents[idx][ni + 1]);
          fragment.push(this._vertexTangents[idx][ni + 2]);
        }
        if (this._vertexTextureCoords.length > idx) {
          fragment.push(this._vertexTextureCoords[idx][ti + 0]);
          fragment.push(this._vertexTextureCoords[idx][ti + 1]);
        }
        fragments.push(...fragment);
      }
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

    // Tangents
    if (this._vertexTangents.length > 0) {
      layouts.push({
        // Tangent
        shaderLocation,
        offset,
        format: 'float32x3',
      });
      shaderLocation += 1;
      offset += 3 * float32Size; // advance 3 elements for the tangent.
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
    this._alpha = options.alpha ?? 1.0;
    this._bumpIntensity = options.bumpIntensity ?? 0.2;
    this._bumpPrecision = options.bumpPrecision ?? 2;
    this._transformationData = new Float32Array(32);
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

  addTangents(tangents: Float32Array) {
    if (this._vertexTangents.length === 0) {
      this._vertexByteSize += 3 * 4;
    }
    this._vertexTangents?.push(tangents);
  }

  addTextures(textures: Float32Array) {
    if (this._vertexTextureCoords.length === 0) {
      this._vertexByteSize += 2 * 4;
    }
    this._vertexTextureCoords.push(textures);
  }
}
