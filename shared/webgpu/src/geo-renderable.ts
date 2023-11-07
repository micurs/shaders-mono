import { Gpu } from './gpu-connection';
import { createGPUBuffer } from './internal/utils';
import { Renderable, RGBAColor } from './types';

const float32Size = 4;

/**
 * TriangleData is a class that holds the data for triangles, its colors, normals and texture coordinates.
 */
export class GeoRenderable implements Renderable {
  private _bufferData: Float32Array[] | null = null;
  private _vertices: Float32Array[] = []; // 3 coordinates per vertex - 3 points for a triangle
  private _colors: Float32Array[] = []; // 4 color components per vertex - 3 points for a triangle
  private _normals: Float32Array[] = []; // 3 coordinates per vertex - 3 points for a triangle
  private _textures: Float32Array[] = []; // 2 coordinates per vertex - 3 points for a triangle
  private _color: RGBAColor = [1.0, 1.0, 1.0, 1.0]; // 4 color components per vertex - 3 points for a triangle
  private _hasTextures = false;
  private _vertexByteSize: number = 0;

  private _buffers: GPUBuffer[] = [];
  private _bufferLayout: GPUVertexBufferLayout | null = null;
  private _topology: GPUPrimitiveTopology = 'triangle-list';
  private _cullMode: GPUCullMode = 'back';

  get hasTextures() {
    return this._hasTextures;
  }

  get color(): RGBAColor {
    return this._color;
  }

  get primitives(): GPUPrimitiveTopology {
    return this._topology;
  }

  get cullMode(): GPUCullMode {
    return this._cullMode;
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
      (this._colors.length > 0 ? this._colors[strip].length * float32Size : 0) +
      (this._normals.length > 0 ? this._normals[strip].length * float32Size : 0) +
      (this._textures.length > 0 ? this._textures[strip].length * float32Size : 0);
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
        if (this._colors.length > idx) {
          fragment.push(this._colors[idx][ci + 0]);
          fragment.push(this._colors[idx][ci + 1]);
          fragment.push(this._colors[idx][ci + 2]);
          fragment.push(this._colors[idx][ci + 3]);
        }
        if (this._textures.length > idx) {
          fragment.push(this._textures[idx][ti + 0]);
          fragment.push(this._textures[idx][ti + 1]);
        }
        if (this._normals.length > idx) {
          fragment.push(this._normals[idx][ni + 0]);
          fragment.push(this._normals[idx][ni + 1]);
          fragment.push(this._normals[idx][ni + 2]);
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
    if (this._colors.length > 0) {
      layouts.push({
        shaderLocation,
        offset,
        format: 'float32x4',
      });
      shaderLocation += 1;
      offset += 4 * float32Size; // advance 4 elements for the color.
    }

    // Textures
    if (this._textures.length > 0) {
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
    if (this._normals.length > 0) {
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

  constructor(topology: GPUPrimitiveTopology, color: RGBAColor = [1.0, 1.0, 1.0, 1.0]) {
    this._topology = topology;
    this._vertexByteSize = 3 * 4;
    this._color = color;
  }

  buildGpuBuffer(gpu: Gpu) {
    this._buffers = this.getBufferData().map((data) => createGPUBuffer(gpu.device, data));
    this._bufferLayout = {
      arrayStride: this.vertexByteSize,
      attributes: this.layouts,
    };
  }

  addColors(colors: Float32Array) {
    if (this._colors.length === 0) {
      this._vertexByteSize += 4 * 4;
    }
    this._colors.push(colors);
  }

  addNormals(normals: Float32Array) {
    if (this._normals.length === 0) {
      this._vertexByteSize += 3 * 4;
    }
    this._normals?.push(normals);
  }

  addTextures(textures: Float32Array) {
    if (this._textures.length === 0) {
      this._vertexByteSize += 2 * 4;
      this._hasTextures = true;
    }
    this._textures.push(textures);
  }
}
