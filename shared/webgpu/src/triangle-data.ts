import { Gpu } from './gpu-connection';
import { createGPUBuffer } from './internal/utils';
import { TriangleMesh, RGBAColor } from './types';

const float32Size = 4;

/**
 * TriangleData is a class that holds the data for triangles, its colors, normals and texture coordinates.
 */
export class TriangleData implements TriangleMesh {
  private _vertices: Float32Array; // 3 coordinates per vertex - 3 points for a triangle
  private _color: RGBAColor = [1.0, 1.0, 1.0, 1.0]; // 4 color components per vertex - 3 points for a triangle
  private _colors: Float32Array | null = null; // 4 color components per vertex - 3 points for a triangle
  private _normals: Float32Array | null = null; // 3 coordinates per vertex - 3 points for a triangle
  private _textures: Float32Array | null = null; // 2 coordinates per vertex - 3 points for a triangle
  private _hasTextures = false;
  private _vertexCount = 0;
  private _vertexByteSize: number = 0;

  private _buffer: GPUBuffer | null = null;
  private _bufferLayout: GPUVertexBufferLayout | null = null;

  get hasTextures() {
    return this._hasTextures;
  }

  get color(): RGBAColor {
    return this._color;
  }

  get primitives(): GPUPrimitiveTopology {
    return 'triangle-list';
  }

  get vertexCount() {
    if (this._vertices === null) {
      return 0;
    }
    return this._vertices.length / 3;
  }

  // The size of each vertex in the buffer as number of bytes!
  get vertexByteSize() {
    return this._vertexByteSize;
  }

  get byteSize() {
    if (this._vertices === null) {
      return 0;
    }
    const size =
      this._vertices.length * float32Size +
      (this._colors !== null ? this._colors.length * float32Size : 0) +
      (this._normals !== null ? this._normals.length * float32Size : 0) +
      (this._textures !== null ? this._textures.length * float32Size : 0);
    return size;
  }

  get vertices() {
    if (this._vertices === null) {
      return new Float32Array();
    }
    const fragments = [];
    for (let vi = 0, ci = 0, ni = 0, ti = 0; vi < this._vertices.length; vi += 3, ci += 4, ni += 3, ti += 2) {
      const fragment = [this._vertices[vi + 0], this._vertices[vi + 1], this._vertices[vi + 2]];
      if (this._colors !== null) {
        fragment.push(this._colors[ci + 0]);
        fragment.push(this._colors[ci + 1]);
        fragment.push(this._colors[ci + 2]);
        fragment.push(this._colors[ci + 3]);
      }
      if (this._textures !== null) {
        fragment.push(this._textures[ti + 0]);
        fragment.push(this._textures[ti + 1]);
      }
      if (this._normals !== null) {
        fragment.push(this._normals[ni + 0]);
        fragment.push(this._normals[ni + 1]);
        fragment.push(this._normals[ni + 2]);
      }
      fragments.push(...fragment);
    }
    console.log('fragments size', fragments.length, fragments.length * float32Size);
    return new Float32Array(fragments);
  }

  get layouts(): GPUVertexAttribute[] {
    let shaderLocation = 0;
    let offset = 0;
    const layouts: GPUVertexAttribute[] = [
      // Position
      {
        shaderLocation,
        offset: 0,
        format: 'float32x3',
      },
    ];
    shaderLocation += 1;
    offset += 3 * float32Size; // skip 3 elements for the coordinates.
    if (this._textures !== null) {
      layouts.push({
        // UV
        shaderLocation,
        offset, // skip 3 elements for the coordinates.
        format: 'float32x2',
      });
      shaderLocation += 1;
      offset += 2 * float32Size; // skip 2 elements for the texture coordinates.
    }
    if (this._normals !== null) {
      layouts.push({
        // Normal
        shaderLocation,
        offset,
        format: 'float32x3',
      });
      shaderLocation += 1;
      offset += 3 * float32Size; // skip 3 elements for the normal.
    }
    if (this._colors !== null) {
      layouts.push({
        // Color
        shaderLocation,
        offset,
        format: 'float32x4',
      });
      shaderLocation += 1;
      offset += 4 * float32Size; // skip 4 elements for the color.
    }

    return layouts;
  }

  get buffer(): GPUBuffer | null {
    return this._buffer;
  }

  get bufferLayout(): GPUVertexBufferLayout | null {
    return this._bufferLayout;
  }

  constructor(vertices: Float32Array, vertexCount: number, color: RGBAColor = [1.0, 1.0, 1.0, 1.0]) {
    if (vertices.length !== vertexCount * 3) {
      throw new Error('TriangleData: Invalid vertex data!');
    }
    this._vertexCount = vertexCount;
    this._vertices = vertices;
    this._vertexByteSize = 3 * 4;
    this._color = color;
  }

  buildGpuBuffer(gpu: Gpu) {
    this._buffer = createGPUBuffer(gpu.device, this.vertices);
    this._bufferLayout = {
      arrayStride: this.vertexByteSize,
      attributes: this.layouts,
    };
  }

  addColors(colors: Float32Array) {
    if (colors.length !== this._vertexCount * 4) {
      throw new Error('TriangleData: Invalid color data!');
    }
    this._colors = colors;
    this._vertexByteSize += 4 * 4;
  }

  addNormals(normals: Float32Array) {
    if (normals.length !== this._vertexCount * 3) {
      throw new Error('TriangleData: Invalid normal data!');
    }
    this._normals = normals;
    this._vertexByteSize += 3 * 4;
  }

  addTextures(textures: Float32Array) {
    if (textures.length !== this._vertexCount * 2) {
      throw new Error('TriangleData: Invalid texture data!');
    }
    this._textures = textures;
    this._vertexByteSize += 2 * 4;
    this._hasTextures = true;
  }
}
