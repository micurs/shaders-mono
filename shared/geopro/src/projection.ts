import { mat4 } from 'gl-matrix';
import { GeoMap } from './operations';
import { Point } from './point';
import { Vector } from './vector';

/**
 * Projection represents perspective or orthographic projection matrices.
 * It conforms to the same GeoMap shape as Transform/Frame, so it can be
 * composed and applied to Points/Vectors/UnitVectors in the same way.
 */
export class Projection {
  _direct: mat4;
  _inverse: mat4;
  _isIdentity: boolean = true;

  private constructor() {
    this._direct = mat4.create();
    this._inverse = mat4.create();
    mat4.invert(this._inverse, this._direct);
  }

  static get bufferSize(): number {
    return 16 * 4;
  }

  static identity(): Projection {
    return new Projection();
  }

  static fromMat4(direct: mat4): Projection {
    const p = new Projection();
    const inverse = mat4.create();
    mat4.invert(inverse, direct);
    p._direct = mat4.clone(direct);
    p._inverse = mat4.clone(inverse);
    p._isIdentity = false;
    return p;
  }

  static perspective(fovy: number, aspect: number, near: number, far: number): Projection {
    const p = new Projection();
    mat4.perspective(p._direct, fovy, aspect, near, far);
    mat4.invert(p._inverse, p._direct);
    p._isIdentity = false;
    return p;
  }

  static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Projection {
    const p = new Projection();
    mat4.ortho(p._direct, left, right, bottom, top, near, far);
    mat4.invert(p._inverse, p._direct);
    p._isIdentity = false;
    return p;
  }

  isFrame(): boolean {
    return false;
  }

  compose(map: GeoMap): Projection {
    const res = new Projection();
    const { _direct: dm1, _inverse: im1 } = this;
    const { _direct: dm2, _inverse: im2 } = map as any;
    mat4.multiply(res._direct, dm2, dm1);
    mat4.multiply(res._inverse, im1, im2);
    res._isIdentity = false;
    return res;
  }

  invert(): Projection {
    const p = new Projection();
    p._direct = mat4.clone(this._inverse);
    p._inverse = mat4.clone(this._direct);
    p._isIdentity = this._isIdentity;
    return p;
  }

  get directMatrix(): mat4 {
    return this._direct;
  }

  get inverseMatrix(): mat4 {
    return this._inverse;
  }

  get isIdentity(): boolean {
    return this._isIdentity;
  }

  buffer(): Float32Array {
    return new Float32Array(this._direct.values());
  }

  inverseBuffer(): Float32Array {
    return new Float32Array(this._inverse.values());
  }

  /**
   * Perform perspective divide on a mapped Point, returning NDC coordinates.
   * If w is 0, the point is returned unchanged.
   */
  toNDC(point: Point): Point {
    const w = (point as any)._coord?.[3] ?? 1.0;
    if (w === 0) return point;
    return Point.fromValues(point.x / w, point.y / w, point.z / w);
  }

  /**
   * Scale a direction vector by its homogeneous w (no-op for w=0 vectors),
   * provided for API symmetry.
   */
  divideW(vector: Vector): Vector {
    const w = (vector as any)._coord?.[3] ?? 0.0;
    if (w === 0) return vector;
    return Vector.fromValues(vector.x / w, vector.y / w, vector.z / w);
  }
}


