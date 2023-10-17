import { mat4 } from "gl-matrix";
import { UnitVector, isUnitVector } from "./unit-vector";
import { MatEntries } from "./types";
import { Vector } from "./vector";
import { Point } from "./point";
import { GeoMap } from "./operations";


export class Frame {
  _direct: mat4;
  _inverse: mat4;

  private constructor() {
    this._direct = mat4.create();
    this._inverse = mat4.create();
    mat4.identity(this._direct);
    mat4.identity(this._inverse);
  }

  isFrame() {
    return true;
  }

  static world() {
    const f = new Frame();
    return f;
  }

  static translation(p: Point) {
    const f = new Frame();
    const m = mat4.create();
    mat4.translate(m, m, p.vec3());
    f._inverse = m;
    mat4.invert(f._direct, f._inverse);
    return f;
  }

  static rotationX(o: Point, angle: number) {
    const f = new Frame();
    const m = mat4.create();
    mat4.translate(m, m, o.vec3());
    mat4.rotateX(m, m, angle);

    f._inverse = m;
    mat4.invert(f._direct, f._inverse);
    return f;
  }

  static rotationY(o: Point, angle: number) {
    const f = new Frame();
    const m = mat4.create();
    mat4.translate(m, m, o.vec3());
    mat4.rotateY(m, m, angle);

    f._inverse = m;
    mat4.invert(f._direct, f._inverse);
    return f;
  }

  static rotationZ(o: Point, angle: number) {
    const f = new Frame();
    const m = mat4.create();
    mat4.translate(m, m, o.vec3());
    mat4.rotateZ(m, m, angle);

    f._inverse = m;
    mat4.invert(f._direct, f._inverse);
    return f;
  }

  /**
   * Build a Frame through an origin and 2 independent vector.
   * The first vector will be considered the Z direction
   * The second vector will point in the semi-space of x
   * @param o - origin point
   * @param v1 - a vector indicating the Z of the new frame
   * @param v2 - a vector in the XY plane of the new frame
   */
  static from2Vectors = (o: Point, v1: Vector | UnitVector, v2: Vector | UnitVector) => {
    const f = new Frame();
    const k = isUnitVector(v1) ? v1 : UnitVector.fromVector(v1);
    const j = UnitVector.crossProduct(k, isUnitVector(v2) ? v2 : UnitVector.fromVector(v2));
    const i = UnitVector.crossProduct(j, k);

    const matValues: MatEntries = [
      ...i.coordinates,
      ...j.coordinates,
      ...k.coordinates,
      ...o.coordinates,
    ] as MatEntries;

    f._inverse = mat4.fromValues(...matValues);
    mat4.invert(f._direct, f._inverse);

    return f;
  }

  map(t: GeoMap): Frame {
    return this.composeWith(t);
  }

  unMap(t: GeoMap): Frame {
    return this.composeWith(t.invert());
  }

  /**
   * Builds and returns the composition of t with the
   * transformation represented by this frame.
   * This can be use to transform a frame to another
   * by using simple transformations.
   * That is: resM = t.M · this.M
   * @param t - the transformation to compose with
   */
  composeWith(t: GeoMap): Frame {
    const frame = new Frame();
    const { _direct: dm1 } = this;
    const { _direct: dm2 } = t;
    mat4.multiply(frame._direct, dm2, dm1);
    mat4.invert(frame._inverse, frame._direct);
    return frame;
  }

  /**
   * Invert the transformation defined for this frame.
  */
  invert(): Frame {
    const t = new Frame();
    t._direct = mat4.clone(this._inverse);
    t._inverse = mat4.clone(this._direct);
    return t;
  }

  /**
   * Retrieve the matrix used to transform from this frame to
   * the global frame.
   */
  get directMatrix() {
    return this._direct;
  }

  /**
   * Retrieve the matrix used to transform from global frame
   * to this frame
   */
  get inverseMatrix() {
    return this._inverse;
  }

  /**
   * The i vector for this frame
   */
  get i(): UnitVector {
    return UnitVector.fromValues(
      this._inverse[0],
      this._inverse[1],
      this._inverse[2],
    );
  }

  /**
   * The j vector for this frame
   */
  get j(): UnitVector {
    return UnitVector.fromValues(
      this._inverse[4],
      this._inverse[5],
      this._inverse[6],
    );
  }

  /**
   * The k vector for this frame
   */
  get k(): UnitVector {
    return UnitVector.fromValues(
      this._inverse[8],
      this._inverse[9],
      this._inverse[10],
    );
  }

  /**
   * The origin of this frame
   */
  get o(): Point {
    return Point.fromValues(
      this._inverse[12],
      this._inverse[13],
      this._inverse[14],
      this._inverse[15],
    );
  }

  /**
   * The origin of this frame
   */
  get origin(): Point {
    return Point.fromValues(
      this._inverse[12],
      this._inverse[13],
      this._inverse[14],
      this._inverse[15],
    );
  }


}


export const isFrame = (d: GeoMap): d is Frame => {
  return d.isFrame()
}