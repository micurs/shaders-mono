import { vec3, vec4 } from "gl-matrix";
import { Transform } from "./transform";
import { Frame } from "./frame";
import { VecEntries } from "./types";
import { Point } from "./point";


export class Vector {
  private _coord: vec4;

  private constructor() {
    this._coord = vec4.fromValues(0, 0, 0, 0);
  }

  static fromValues(x: number, y: number, z: number): Vector {
    const v = new Vector();
    v._coord = vec4.fromValues(x, y, z, 0);
    return v;
  }

  static fromVec4(v: vec4) {
    const p = new Vector();
    const w = v[3] !== 0 ? v[3] : 1.0;
    p._coord = vec4.fromValues(v[0] / w, v[1] / w, v[2] / w, 0.0);
    return p;
  }

  static fromVec3(v: vec3) {
    const p = new Vector();
    p._coord = vec4.fromValues(v[0], v[1], v[2], 0.0);
    return p;
  }


  /**
   * Compute a vector as a difference between two points p1 - p2
   * @param p1
   * @param p2
   * @returns
   */
  static fromPoints(p1: Point, p2: Point) {
    const v = new Vector();
    vec4.subtract(v._coord, p1.vec4(), p2.vec4());
    return v;
  }

  /**
   * Returns a new Vector computed as the cross-product
   * of the two vector passed as parameter: u' = u1 x u2
   * @param v1 - a first unit-vector
   * @param v2 - a second unit-vector
   */
  static crossProduct = (v1: Vector, v2: Vector): Vector => {
    const res = vec3.create();
    vec3.cross(res, v1.vec3(), v2.vec3());
    return Vector.fromVec3(res);
  };

  static dot = (v1: Vector, v2: Vector): number => {
    return vec3.dot(v1.vec3(), v2.vec3());
  };

  toString() {
    return `Vector(${this.x}, ${this.y}, ${this.z})`;
  }

  map(t: Transform | Frame): Vector {
    const p = new Vector();
    if (t.isFrame()) {
      vec4.transformMat4(p._coord, this._coord, t.inverseMatrix);
    } else {
      vec4.transformMat4(p._coord, this._coord, t.directMatrix);
    }
    return p;
  }

  unMap(t: Transform | Frame): Vector {
    const p = new Vector();
    if (t.isFrame()) {
      vec4.transformMat4(p._coord, this._coord, t.directMatrix);
    } else {
      vec4.transformMat4(p._coord, this._coord, t.inverseMatrix);
    }
    return p;
  }

  relative(f: Frame): Vector {
    return this.map(f);
  }

  absolute(f: Frame): Vector {
    return this.unMap(f);
  }

  /**
   * Return a new vector by multiplying this one by a scalar
   * @param s - the multiplier
   */
  scale = (s: number) => {
    const v = new Vector();
    vec4.scale(v._coord, this._coord, s);
    return v;
  };

  dot = (v: Vector): number => {
    return vec3.dot(this.vec3(), v.vec3());
  };

  isUnitVector() {
    return false;
  }

  /**
   * Get component along the X axis
   */
  get x(): number {
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

  get coordinates(): VecEntries {
    return [...this._coord.values()] as VecEntries;
  }

  get length() {
    const x = this._coord[0];
    const y = this._coord[1];
    const z = this._coord[2];
    return Math.sqrt(x * x + y * y + z * z);
  }

  get lengthSquare() {
    const x = this._coord[0];
    const y = this._coord[1];
    const z = this._coord[2];
    return x * x + y * y + z * z;
  }

  vec3(): Readonly<vec3> {
    return vec3.fromValues(this.x, this.y, this.z);
  }

  vec4(): Readonly<vec4> {
    return vec4.fromValues(this.x, this.y, this.z, 0.0);
  }
}