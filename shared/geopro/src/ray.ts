import { Frame } from "./frame";
import { Point } from "./point";
import { Transform } from "./transform";
import { UnitVector, isUnitVector } from "./unit-vector";
import { Vector } from "./vector";



export class Ray {
  private _origin: Point;
  private _direction: UnitVector;

  private constructor() {
    this._origin = Point.fromValues(0, 0, 0);
    this._direction = UnitVector.fromValues(1, 0, 0);
  }

  static fromPoints(o: Point, d: Point): Ray {
    const r = new Ray();
    r._origin = o;
    r._direction = UnitVector.fromVector(Vector.fromPoints(d, o));
    return r;
  }

  static fromPointAndVector(o: Point, d: Vector | UnitVector): Ray {
    const r = new Ray();
    r._origin = o;
    r._direction = isUnitVector(d) ? d : UnitVector.fromVector(d);
    return r;
  }

  get o(): Point {
    return this._origin;
  }

  get d(): UnitVector {
    return this._direction;
  }

  /**
   * Convert the Ray relative to the given frame to a frame in world coordinate
   * @param f
   */
  relative(f: Frame): Ray {
    const rw = new Ray();
    rw._origin = this._origin.relative(f);
    rw._direction = this._direction.relative(f);
    return rw;
  }

  /**
   * Convert the Ray relative to the given frame to a frame in world coordinate
   * @param f
   */
  absolute(f: Frame): Ray {
    const rw = new Ray();
    rw._origin = this._origin.absolute(f);
    rw._direction = this._direction.absolute(f);
    return rw;
  }

}