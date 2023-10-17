import { vec3, vec4 } from "gl-matrix";
import { VecEntries } from "./types";
import { GeoMap } from "./operations";
import { Vector } from "./vector";
import { Frame } from "./frame";



export class Point {
  private _coord: vec4;

  private constructor() {
    this._coord = vec4.fromValues(0,0,0,1);
  }

  static origin() {
    const p = new Point();
    return p;
  }


  static fromValues(x: number, y: number, z: number, w = 1.0) {
    const p = new Point();
    p._coord = vec4.fromValues(x / w, y / w, z / w, 1.0);
    return p;
  }

  static fromVec4(v: vec4) {
    const p = new Point();
    const w = v[3] !==0 ? v[3] : 1.0;
    p._coord = vec4.fromValues(v[0] / w, v[1] / w, v[2] / w, 1.0);
    return p;
  }

  static fromVec3(v: vec3) {
    const p = new Point();
    p._coord = vec4.fromValues(v[0], v[1], v[2], 1.0);
    return p;
  }

  /**
   * Transform a point via a transformation or a reference frame
   * When t is a Transform map apply the direct transformation to the point and return the result.
   * When t is a Frame mapping a point means compute the point relative to the given Frame
   * @param t - transformation or reference frame
   * @returns a new Point
   */
  map(t: GeoMap): Point {
    const p = new Point();
    if (t.isFrame()) {
      vec4.transformMat4(p._coord, this._coord, t.inverseMatrix);
    } else {
      vec4.transformMat4(p._coord, this._coord, t.directMatrix);
    }
    return p;
  }

  /**
   * unMap() execute the inverse transformation from the given t.
   * If t is a Transformation this use the inverse transform to produce a new Point
   * if t is a Frame this create a new version of the given point in world coordinate as it was relative to the frame
   * @param t - Transform or Frame
   * @returns a new Point
   */
  unMap(t: GeoMap): Point {
    const p = new Point();
    if (t.isFrame()) {
      vec4.transformMat4(p._coord, this._coord, t.directMatrix);
    } else {
      vec4.transformMat4(p._coord, this._coord, t.inverseMatrix);
    }
    return p;
  }


  relative(f: Frame): Point {
    return this.unMap(f);
  }

  absolute(f: Frame): Point {
    return this.map(f);
  }

  static relative(p: Point, f: Frame): Point {
    return p.unMap(f);
  }

  static absolute(p: Point, f: Frame): Point {
    return p.map(f);
  }

  subtract(p: Point): Vector {
    const v = vec4.create();
    vec4.subtract(v, this._coord, p._coord);
    return Vector.fromVec4(v);
  }

  scale(s: number): Point {
    const v = vec4.create();
    vec4.scale(v, this._coord, s);
    return Point.fromVec4(v);
  }

  relativeTo(f: Frame): Point {
    return this.map(f.invert());
  }

  absoluteFrom(f: Frame): Point {
    return this.map(f);
  }

  isPoint() {
    return true;
  }
  get x() {
    return this._coord[0];
  }
  get y() {
    return this._coord[1];
  }
  get z() {
    return this._coord[2];
  }

  get coordinates(): VecEntries {
    return [...this._coord.values()] as VecEntries;
  }

  vec3(): Readonly<vec3> {
    return vec3.fromValues(this.x, this.y, this.z);
  }

  vec4(): Readonly<vec4> {
    return vec4.fromValues(this.x, this.y, this.z, 0.0);
  }
}