import { Gpu } from './gpu-connection';
import { createGPUBuffer } from './internal/utils';
import { TriangleMesh, RGBAColor } from './types';

const float32Size = 4;

/**
 * TriangleData is a class that holds the data for triangles, its colors, normals and texture coordinates.
 */
export class TriangleData implements TriangleMesh {
  private _vertices: Float32Array[] = []; // 3 coordinates per vertex - 3 points for a triangle
  private _colors: Float32Array[] | null = null; // 4 color components per vertex - 3 points for a triangle
  private _normals: Float32Array[] | null = null; // 3 coordinates per vertex - 3 points for a triangle
  private _textures: Float32Array[] | null = null; // 2 coordinates per vertex - 3 points for a triangle
  private _color: RGBAColor = [1.0, 1.0, 1.0, 1.0]; // 4 color components per vertex - 3 points for a triangle
  private _hasTextures = false;
  private _vertexByteSize: number = 0;

  private _buffers: GPUBuffer[] = [];
  private _bufferLayout: GPUVertexBufferLayout | null = null;
  private _topology: GPUPrimitiveTopology = 'triangle-list';

  get hasTextures() {
    return this._hasTextures;
  }

  get color(): RGBAColor {
    return this._color;
  }

  get primitives(): GPUPrimitiveTopology {
    return this._topology;
  }

  get vertexCount() {
    return this._vertices.reduce((acc, vtx) => acc + vtx.length / 3, 0);
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
      (this._colors !== null ? this._colors.length * float32Size : 0) +
      (this._normals !== null ? this._normals.length * float32Size : 0) +
      (this._textures !== null ? this._textures.length * float32Size : 0);
    return size;
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
  get vertices(): Float32Array[] {
    if (this._vertices === null) {
      return [new Float32Array()];
    }

    return this._vertices.map((vertices, idx) => {
      const fragments = [];
      for (let vi = 0, ci = 0, ni = 0, ti = 0; vi < vertices.length; vi += 3, ci += 4, ni += 3, ti += 2) {
        const fragment = [vertices[vi + 0], vertices[vi + 1], vertices[vi + 2]];
        if (this._colors !== null) {
          fragment.push(this._colors[idx][ci + 0]);
          fragment.push(this._colors[idx][ci + 1]);
          fragment.push(this._colors[idx][ci + 2]);
          fragment.push(this._colors[idx][ci + 3]);
        }
        if (this._textures !== null) {
          fragment.push(this._textures[idx][ti + 0]);
          fragment.push(this._textures[idx][ti + 1]);
        }
        if (this._normals !== null) {
          fragment.push(this._normals[idx][ni + 0]);
          fragment.push(this._normals[idx][ni + 1]);
          fragment.push(this._normals[idx][ni + 2]);
        }
        fragments.push(...fragment);
      }
      // console.log('fragments size', fragments.length, fragments.length * float32Size);
      return new Float32Array(fragments);
    });
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

  get buffers(): GPUBuffer[] {
    return this._buffers;
  }

  get bufferLayout(): GPUVertexBufferLayout {
    if (this._bufferLayout === null) {
      throw new Error('TriangleData: Buffer layout is not available! - Did you call buildGpuBuffer() ?');
    }
    return this._bufferLayout;
  }

  constructor(topology: GPUPrimitiveTopology, color: RGBAColor = [1.0, 1.0, 1.0, 1.0]) {
    this._topology = topology;
    this._vertexByteSize = 3 * 4;
    this._color = color;
  }

  buildGpuBuffer(gpu: Gpu) {
    this._buffers = this._vertices.map((vertices) => createGPUBuffer(gpu.device, vertices));
    this._bufferLayout = {
      arrayStride: this.vertexByteSize,
      attributes: this.layouts,
    };
  }

  addColors(colors: Float32Array) {
    if (this._colors === null) {
      this._colors = [];
      this._vertexByteSize += 4 * 4;
    }
    this._colors.push(colors);
  }

  addNormals(normals: Float32Array) {
    if (this._normals === null) {
      this._normals = [];
      this._vertexByteSize += 3 * 4;
    }
    this._normals?.push(normals);
  }

  addTextures(textures: Float32Array) {
    if (this._textures === null) {
      this._textures = [];
      this._vertexByteSize += 2 * 4;
      this._hasTextures = true;
    }
    this._textures.push(textures);
  }
}
