import { quat, mat3 } from 'gl-matrix';
import { Transform } from './transform';

export class Rotation {
  _direct: quat;
  _inverse: quat;

  private constructor() {
    this._direct = quat.create();
    this._inverse = quat.create();
  }

  static identity() {
    const r = new Rotation();
    return r;
  }

  static fromValues(x: number, y: number, z: number, w: number) {
    const r = new Rotation();
    r._direct = quat.fromValues(x, y, z, w);
    quat.invert(r._inverse, r._direct);
    return r;
  }

  static fromAngles(x: number, y: number, z: number) {
    return Rotation.rotationX(x).rotateY(y).rotateZ(z);
  }

  static fromQuat(direct: quat) {
    const r = new Rotation();
    r._direct = quat.clone(direct);
    quat.invert(r._inverse, r._direct);
    return r;
  }

  static fromArray(direct: number[]) {
    const r = new Rotation();
    r._direct = quat.clone(direct as quat);
    quat.invert(r._inverse, r._direct);
    return r;
  }

  static fromTransform(t: Transform) {
    const rm = mat3.create();
    mat3.fromMat4(rm, t.directMatrix);
    const r = new Rotation();
    r._direct = quat.fromMat3(r._direct, rm);
    quat.invert(r._inverse, r._direct);
    return r;
  }

  static rotationX(a: number) {
    const r = new Rotation();
    quat.rotateX(r._direct, r._direct, a);
    quat.invert(r._inverse, r._direct);
    return r;
  }

  static rotationY(a: number) {
    const r = new Rotation();
    quat.rotateY(r._direct, r._direct, a);
    quat.invert(r._inverse, r._direct);
    return r;
  }

  static rotationZ(a: number) {
    const r = new Rotation();
    quat.rotateZ(r._direct, r._direct, a);
    quat.invert(r._inverse, r._direct);
    return r;
  }

  // get angleX(): number {
  //   return quat.getAxisAngle([1, 0, 0], this._direct);
  // }

  // get angleY(): number {
  //   return quat.getAxisAngle([0, 1, 0], this._direct);
  // }

  // get angleZ(): number {
  //   return quat.getAxisAngle([0, 0, 1], this._direct);
  // }

  rotateX(a: number): Rotation {
    const r = new Rotation();
    r._direct = this._direct;
    r._inverse = this._inverse;
    r.compose(Rotation.rotationX(a));
    return r;
  }

  rotateY(a: number): Rotation {
    const r = new Rotation();
    r._direct = this._direct;
    r._inverse = this._inverse;
    r.compose(Rotation.rotationY(a));
    return r;
  }

  rotateZ(a: number): Rotation {
    const r = new Rotation();
    r._direct = this._direct;
    r._inverse = this._inverse;
    r.compose(Rotation.rotationZ(a));
    return r;
  }

  inverse(): Rotation {
    const r = new Rotation();
    r._direct = quat.clone(this._inverse);
    r._inverse = quat.clone(this._direct);
    return r;
  }

  /**
   * Compose this rotation with another rotation.
   * the result is a Rotation that represents the rotation of the
   * this rotation followed by the rotation expressed by the parameter.
   * @param r - rotation to apply after this rotation
   * @returns a new Rotation representing the composition of this rotation and the parameter.
   */
  compose(r: Rotation): Rotation {
    const res = new Rotation();
    quat.multiply(res._direct, this._direct, r._direct);
    quat.invert(res._inverse, res._direct);
    return res;
  }

  get quat(): quat {
    return this._direct;
  }
}
