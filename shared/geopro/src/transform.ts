import { mat4, quat } from "gl-matrix";
import { GeoMap } from "./operations";
import { Ray } from "./ray";
import { Point } from './point';
import { Frame, UnitVector, Vector } from '.';

export class Transform {
  _direct: mat4;
  _inverse: mat4;
  _isIdentity: boolean = true;

  private constructor() {
    this._direct = mat4.create();
    this._inverse = mat4.create();
    mat4.invert(this._inverse, this._direct);
  }

  static identity() {
    const t = new Transform();
    return t;
  }

  static fromMat4(direct: mat4) {
    const t = new Transform();
    const inverse = mat4.create();
    mat4.invert(inverse, direct);
    t._direct = mat4.clone(direct);
    t._inverse = mat4.clone(inverse);
    t._isIdentity = false;
    return t;
  }

  static lookAt(eye: Point, target: Point, up: UnitVector) {
    const t = new Transform();
    mat4.lookAt(t._direct, eye.vec3(), target.vec3(), up.vec3());
    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  static perspective(fovy: number, aspect: number, near: number, far: number) {
    const t = new Transform();
    mat4.perspective(t._direct, fovy, aspect, near, far);
    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  static invert(s: Transform): Transform {
    const t = new Transform();
    t._direct = mat4.clone(s._inverse);
    t._inverse = mat4.clone(s._direct);
    t._isIdentity = false;
    return t;
  }

  static translation(tx: number, ty: number, tz: number) {
    const t = new Transform();
    mat4.translate(t._direct, t._direct, [tx, ty, tz]);
    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  static move(mv: Vector) {
    const t = new Transform();
    mat4.translate(t._direct, t._direct, mv.vec3());
    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  static rotationX(a: number) {
    const t = new Transform();
    mat4.rotateX(t._direct, t._direct, a);
    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  static rotationY(a: number) {
    const t = new Transform();
    mat4.rotateY(t._direct, t._direct, a);
    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  static rotationZ(a: number) {
    const t = new Transform();
    mat4.rotateZ(t._direct, t._direct, a);
    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  static scale(tx: number, ty: number, tz: number) {
    const t = new Transform();
    mat4.scale(t._direct, t._direct, [tx, ty, tz]);
    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  static fromRotation(angle: number, axes: Ray): Transform {
    const t = new Transform();

    const transToOrigin = mat4.create();
    const rot = quat.create();
    const rotMat = mat4.create();
    const transToPoint = mat4.create();

    mat4.fromTranslation(transToPoint, axes.o.vec3());
    mat4.invert(transToOrigin, transToPoint);
    quat.setAxisAngle(rot, axes.d.vec3(), angle);

    mat4.fromQuat(rotMat, rot);

    // The full transformation is: transBack · rotM · transTo
    mat4.multiply(t._direct, transToPoint, rotMat);
    mat4.multiply(t._direct, t._direct, transToOrigin);

    mat4.invert(t._inverse, t._direct);
    t._isIdentity = false;
    return t;
  }

  isFrame() {
    return false;
  }

  buffer(): ArrayBuffer {
    return new Float32Array(this._direct);
  }

  // mapPoint(p: Point): Point {
  //   return p.map(this);
  // }

  // mapFrame(f: Frame): Frame {
  //   return f.map(this);
  // }

  // mapVector<T extends { map: (t: Transform) => T }>(v: T): T {
  //   return v.map(this);
  // }

  map<T extends { map: (t: Transform) => T }>(v: T): T {
    return v.map(this);
  }

  /**
   * Builds and returns the composition of t with this transformation
   * That is: resM = t.M · this.M
   * @param t - the transformation to compose with
   */
  compose(trans: GeoMap): Transform {
    const t = new Transform();
    const { _direct: dm1, _inverse: im1 } = this;
    const { _direct: dm2, _inverse: im2 } = trans;
    mat4.multiply(t._direct, dm2, dm1);
    mat4.multiply(t._inverse, im1, im2);
    t._isIdentity = false;
    return t;
  }

  invert() {
    const t = new Transform();
    t._direct = mat4.clone(this._inverse);
    t._inverse = mat4.clone(this._direct);
    t._isIdentity = this._isIdentity;
    return t;
  }

  get directMatrix(): mat4 {
    return this._direct;
  }
  get inverseMatrix() {
    return this._inverse;
  }

  get isIdentity() {
    return this._isIdentity;
  }
}