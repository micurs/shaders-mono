import { vec3, vec4 } from "gl-matrix";
import { Vector } from "./vector";
import { VecEntries } from "./types";
import { Transform } from "./transform";
import { Frame } from "./frame";
import { Point } from './point';

export class UnitVector {
  private _coord: vec4;

  private constructor() {
    this._coord = vec4.fromValues(1.0, 1.0, 1.0, 0.0);
  }

  static fromVector(v: Vector) {
    const uv = new UnitVector();
    uv._coord = vec4.fromValues(v.x, v.y, v.z, 0);
    vec4.normalize(uv._coord, uv._coord);
    return uv;
  }

  fromPoint(p: Point) {
    const uv = UnitVector.fromValues(...p.triplet);
    return uv;
  }

  static fromValues(x: number, y: number, z: number): UnitVector {
    const v = vec4.fromValues(x, y, z, 0);
    vec4.normalize(v, v);
    return UnitVector.fromVec4(v);
  }

  /**
   * Returns a new UnitVector computed as the cross-product
   * of the two unit-vector passed as parameter: u' = u1 x u2
   * @param v1 - a first unit-vector
   * @param v2 - a second unit-vector
   */
  static crossProduct = (v1: UnitVector | Vector, v2: UnitVector | Vector) => {
    const res = vec3.create();
    vec3.cross(res, v1.vec3(), v2.vec3());
    return UnitVector.fromVec3(res);
  };

  static fromVec4(v: vec4) {
    const p = new UnitVector();
    const w = v[3] !== 0 ? v[3] : 1.0;
    p._coord = vec4.fromValues(v[0] / w, v[1] / w, v[2] / w, 0.0);
    vec4.normalize(p._coord, p._coord);
    return p;
  }

  static fromVec3(v: vec3) {
    const p = new UnitVector();
    p._coord = vec4.fromValues(v[0], v[1], v[2], 0.0);
    vec4.normalize(p._coord, p._coord);
    return p;
  }

  toString() {
    return `UnitVector(${this.x}, ${this.y}, ${this.z})`;
  }

  map(t: Transform | Frame): UnitVector {
    const p = new UnitVector();
    if (t.isFrame()) {
      vec4.transformMat4(p._coord, this._coord, t.inverseMatrix);
    } else {
      vec4.transformMat4(p._coord, this._coord, t.directMatrix);
    }
    vec4.normalize(p._coord, p._coord);
    return p;
  }

  unMap(t: Transform | Frame): UnitVector {
    const p = new UnitVector();
    if (t.isFrame()) {
      vec4.transformMat4(p._coord, this._coord, t.directMatrix);
    } else {
      vec4.transformMat4(p._coord, this._coord, t.inverseMatrix);
    }
    vec4.normalize(p._coord, p._coord);
    return p;
  }

  relative(f: Frame): UnitVector {
    return this.map(f);
  }

  absolute(f: Frame): UnitVector {
    return this.unMap(f);
  }

  invert(): UnitVector {
    const p = new UnitVector();
    vec4.negate(p._coord, this._coord);
    return p;
  }

  scale(s: number): Vector {
    return Vector.fromValues(this.x * s, this.y * s, this.z * s);
  }

  /**
   * return tru if the object is a UnitVector
   */
  isUnitVector() {
    return true;
  }

  /**
   * Get component along the X axis
   */
  get x() {
    return this._coord[0];
  }

  /**
   * Get component along the Y axis
   */
  get y() {
    return this._coord[1];
  }

  /**
   * Get component along the Z axis
   */
  get z() {
    return this._coord[2];
  }

  get length() {
    return 1.0;
  }

  get coordinates(): VecEntries {
    return [...this._coord.values()] as VecEntries;
  }

  get triplet(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  vec3(): Readonly<vec3> {
    return vec3.fromValues(this.x, this.y, this.z);
  }
}

export const isUnitVector = (v: Vector | UnitVector): v is UnitVector => {
  return v.isUnitVector();
}