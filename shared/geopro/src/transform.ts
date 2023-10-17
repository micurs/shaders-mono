import { mat4, quat } from "gl-matrix";
import { GeoMap } from "./operations";
import { Ray } from "./ray";


export class Transform {
  _direct: mat4;
  _inverse: mat4;


  private constructor() {
    this._direct = mat4.create();
    this._inverse = mat4.create();
    mat4.invert(this._inverse, this._direct);
  }

  static identity() {
    const t = new Transform();
    return t;
  }

  static fromMatrices(direct: mat4, invert: mat4) {
    const t =  new Transform();
    t._direct = mat4.clone(direct);
    t._inverse = mat4.clone(invert);
    return t;
  }

  static invert(t: Transform): Transform {
    return Transform.fromMatrices(t._inverse, t._direct);
  }

  static translation(tx: number, ty: number, tz: number) {
    const t = new Transform();
    mat4.translate(t._direct, t._direct, [tx, ty, tz]);
    mat4.invert(t._inverse, t._direct);
    return t;
  }

  static rotationX(a: number) {
    const t = new Transform();
    mat4.rotateX(t._direct, t._direct, a);
    mat4.invert(t._inverse, t._direct);
    return t;
  }

  static rotationY(a: number) {
    const t = new Transform();
    mat4.rotateY(t._direct, t._direct, a);
    mat4.invert(t._inverse, t._direct);
    return t;
  }

  static rotationZ(a: number) {
    const t = new Transform();
    mat4.rotateZ(t._direct, t._direct, a);
    mat4.invert(t._inverse, t._direct);
    return t;
  }

  static scale(tx: number, ty: number, tz: number) {
    const t = new Transform();
    mat4.scale(t._direct, t._direct, [tx, ty, tz]);
    mat4.invert(t._inverse, t._direct);
    return t;
  }

  static fromRotation( angle: number, axes: Ray): Transform {
    const t = new Transform();

    const transToOrigin = mat4.create();
    const rot = quat.create();
    const rotMat = mat4.create();
    const transToPoint = mat4.create();

    mat4.fromTranslation(transToPoint, axes.o.vec3());
    mat4.invert(transToOrigin, transToPoint);
    quat.setAxisAngle(rot, axes.d.vec3(), angle);

    mat4.fromQuat(rotMat, rot)

    // The full transformation is: transBack · rotM · transTo
    mat4.multiply(t._direct, transToPoint, rotMat);
    mat4.multiply(t._direct, t._direct, transToOrigin);

    mat4.invert(t._inverse, t._direct);
    return t;
  }

  isFrame() {
    return false;
  }

  /**
   * Builds and returns the composition of t with this transformation
   * That is: resM = t.M · this.M
   * @param t - the transformation to compose with
   */
  composeWith(trans: GeoMap): Transform {
    const t = new Transform();
    const { _direct: dm1, _inverse: im1 } = this;
    const { _direct: dm2, _inverse: im2 } = trans;
    mat4.multiply(t._direct, dm2, dm1);
    mat4.multiply(t._inverse, im1, im2);
    return t;
  }

  invert() {
    const t = new Transform();
    t._direct = mat4.clone(this._inverse);
    t._inverse = mat4.clone(this._direct);
    return t;
  }

  get directMatrix(): mat4 {
    return this._direct;
  }
  get inverseMatrix() {
    return this._inverse;
  }

}