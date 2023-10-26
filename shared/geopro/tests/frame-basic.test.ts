import { describe, test, expect } from 'vitest';

import { Point, Frame, UnitVector, Vector, deg2rad, round, rad2deg, isFrame, Ray } from '../src';

describe('Frame basic operations', () => {
  const prec = 6;

  test('Create a world frame', () => {
    const f = Frame.world();
    expect(f.isFrame()).toBe(true);
    expect(f.o.x).toBe(0);
    expect(f.o.y).toBe(0);
    expect(f.o.z).toBe(0);
    expect(f.origin.x).toBe(0);
    expect(f.origin.y).toBe(0);
    expect(f.origin.z).toBe(0);

    expect(f.i.x).toBe(1);
    expect(f.i.y).toBe(0);
    expect(f.i.z).toBe(0);

    expect(f.j.x).toBe(0);
    expect(f.j.y).toBe(1);
    expect(f.j.z).toBe(0);

    expect(f.k.x).toBe(0);
    expect(f.k.y).toBe(0);
    expect(f.k.z).toBe(1);

    expect(isFrame(f)).toBe(true);
  });

  test('Create a frame from a point and two vectors', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = Vector.fromValues(0, 0, 10);
    const v2 = Vector.fromValues(10, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);

    expect(f.isFrame()).toBe(true);
    expect(f.o.x).toBe(10);
    expect(f.o.y).toBe(10);
    expect(f.o.z).toBe(10);

    expect(f.i.x).toBe(1);
    expect(f.i.y).toBe(0);
    expect(f.i.z).toBe(0);

    expect(f.j.x).toBe(0);
    expect(f.j.y).toBe(1);
    expect(f.j.z).toBe(0);

    expect(f.k.x).toBe(0);
    expect(f.k.y).toBe(0);
    expect(f.k.z).toBe(1);
  });

  test('Create a frame from a point and two unit vectors', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = UnitVector.fromValues(0, 0, 1);
    const v2 = UnitVector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);

    expect(f.isFrame()).toBe(true);
    expect(f.o.x).toBe(10);
    expect(f.o.y).toBe(10);
    expect(f.o.z).toBe(10);

    expect(f.i.x).toBe(1);
    expect(f.i.y).toBe(0);
    expect(f.i.z).toBe(0);

    expect(f.j.x).toBe(0);
    expect(f.j.y).toBe(1);
    expect(f.j.z).toBe(0);

    expect(f.k.x).toBe(0);
    expect(f.k.y).toBe(0);
    expect(f.k.z).toBe(1);
  });

  test('Compute the relative position of a point in a frame - on the origin', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = Vector.fromValues(0, 0, 1);
    const v2 = Vector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);
    const p = Point.fromValues(10, 10, 10);
    const rp = p.relative(f);
    const rp1 = Point.relative(p, f);
    expect(rp.x).toBe(0);
    expect(rp.y).toBe(0);
    expect(rp.z).toBe(0);
    expect(rp).toEqual(rp1);
  });

  test('Compute the relative position of a point in a frame - on the X axis', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = Vector.fromValues(0, 0, 1);
    const v2 = Vector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);
    const p = Point.fromValues(20, 10, 10);
    const rel = p.relative(f);
    expect(rel.x).toBe(10);
    expect(rel.y).toBe(0);
    expect(rel.z).toBe(0);
  });

  test('Compute the relative coordinates of a vector in a (rotated) frame - on the X axis', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = Vector.fromValues(0, 1, 0);
    const v2 = Vector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);

    // f k is Y, j is -Z, i is X
    const v = Vector.fromValues(0, 0, 10);
    const rel = v.relative(f);

    expect(rel.x).toBe(0);
    expect(rel.y).toBe(-10);
    expect(rel.z).toBe(0);

    const abs = rel.absolute(f);
    expect(abs.x).toBe(0);
    expect(abs.y).toBe(0);
    expect(abs.z).toBe(10);
  });

  test('Compute the relative coordinates of a unit-vector in a (rotated) frame - on the X axis', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = Vector.fromValues(0, 1, 0);
    const v2 = Vector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);

    // f k is Y, j is -Z, i is X
    const v = UnitVector.fromValues(0, 0, 10);
    const rel = v.relative(f);

    expect(rel.x).toBe(0);
    expect(rel.y).toBe(-1);
    expect(rel.z).toBe(0);

    const abs = rel.absolute(f);
    expect(abs.x).toBe(0);
    expect(abs.y).toBe(0);
    expect(abs.z).toBe(1);
  });

  test('Compute the relative position of a point in a (rotated) frame - on the X axis', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = Vector.fromValues(0, 1, 0);
    const v2 = Vector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);
    // f k is Y, j is -Z, i is X
    const p = Point.fromValues(10, 15, 0);
    const rel = p.relative(f);
    expect(rel.x).toBe(0);
    expect(rel.y).toBe(10);
    expect(rel.z).toBe(5);
    const abs = rel.absolute(f);
    const abs1 = Point.absolute(rel, f);
    expect(abs.x).toBe(10);
    expect(abs.y).toBe(15);
    expect(abs.z).toBe(0);
    expect(abs).toEqual(abs1);
  });

  test('Compute the absolute and relative position of a point defined in a frame', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = Vector.fromValues(0, 0, 1);
    const v2 = Vector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);
    const p = Point.fromValues(0, 0, 0);
    const abs = p.absolute(f);
    expect(abs.x).toBe(10);
    expect(abs.y).toBe(10);
    expect(abs.z).toBe(10);
    const rel = abs.relative(f);
    expect(rel.x).toBe(0);
    expect(rel.y).toBe(0);
    expect(rel.z).toBe(0);
  });

  test('Compute the absolute and relative position of a ray defined in a frame', () => {
    const o = Point.fromValues(10, 10, 10);
    const v1 = Vector.fromValues(0, 0, 1);
    const v2 = Vector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);

    expect(f.i).toEqual(UnitVector.fromValues(1, 0, 0));
    expect(f.k).toEqual(UnitVector.fromValues(0, 0, 1));

    const ray = Ray.fromPointAndVector(Point.fromValues(0, 0, 0), Vector.fromValues(1, 1, 1));

    // Ray is defined in the frame => get its world coordinates
    const rayAbs = ray.absolute(f);
    expect(rayAbs.o.x).toBeCloseTo(10);
    expect(rayAbs.o.y).toBeCloseTo(10);
    expect(rayAbs.o.z).toBeCloseTo(10);
    expect(rayAbs.d.x).toBeCloseTo(ray.d.x);
    expect(rayAbs.d.y).toBeCloseTo(ray.d.y);
    expect(rayAbs.d.z).toBeCloseTo(ray.d.z);

    // Ray is defined in world coordinates => get its frame coordinates
    const rayRel = ray.relative(f);
    expect(rayRel.o.x).toBe(-10);
    expect(rayRel.o.y).toBe(-10);
    expect(rayRel.o.z).toBe(-10);
    expect(rayRel.d).toEqual(ray.d);
  });

  test('Compute a reference frame rotate 90 degrees around the X axis', () => {
    const o = Point.fromValues(0, 1, 0);
    const f = Frame.rotationX(o, deg2rad(90));
    // i is X, j is Z, k is -Y
    const p = Point.fromValues(0, 1, 0);

    const abs = p.relative(f);
    expect(abs.x).toBeCloseTo(0);
    expect(abs.y).toBeCloseTo(0);
    expect(abs.z).toBeCloseTo(0);
  });

  test('Compute a reference frame rotate 90 degrees around the Y axis', () => {
    const o = Point.fromValues(-1, 0, 0);
    const f = Frame.rotationY(o, deg2rad(90));
    // i is X, j is Z, k is -Y
    const p = Point.fromValues(-1, 0, 0);

    const abs = p.relative(f);
    expect(abs.x).toBe(0);
    expect(abs.y).toBe(0);
    expect(abs.z).toBe(0);
  });

  test('Compute a reference frame rotate 90 degrees around the Z axis', () => {
    const o = Point.fromValues(10, 10, 10);
    const f = Frame.rotationZ(o, deg2rad(90));
    // i is X, j is Z, k is -Y
    const p0 = Point.fromValues(10, 10, 10);
    const p1 = Point.fromValues(11, 11, 11);

    const relP0 = p0.relative(f);
    const relP1 = p1.relative(f);
    expect(relP0.x).toBe(0);
    expect(relP0.y).toBe(0);
    expect(relP0.z).toBe(0);
    expect(relP1.x).toBe(1);
    expect(relP1.y).toBe(-1);
    expect(relP1.z).toBe(1);
  });

  test('Compute 2 frames and compose them into a third one', () => {
    const o1 = Point.fromValues(1, 1, 1);
    const f1 = Frame.translation(o1);
    const o2 = Point.fromValues(-1, -1, -1);
    const f2 = Frame.translation(o2);

    // Combine the two frames to a new frame that is back into the origin
    const f1f2 = f1.map(f2);

    expect(f1f2.o.x).toBe(0);
    expect(f1f2.o.y).toBe(0);
    expect(f1f2.o.z).toBe(0);

    const f1f2inv = f1.unMap(f2);
    expect(f1f2inv.o.x).toBe(2);
    expect(f1f2inv.o.y).toBe(2);
    expect(f1f2inv.o.z).toBe(2);
  });

  test('Compute 2 frames - rotX - and compose them into a third one', () => {
    const o1 = Point.fromValues(1, 1, 1);
    const f1 = Frame.rotationX(o1, rad2deg(90));
    const f2 = f1.invert();
    const f1f2 = f1.map(f2);

    expect(f1f2.o.x).toBeCloseTo(0);
    expect(f1f2.o.y).toBeCloseTo(0);
    expect(f1f2.o.z).toBeCloseTo(0);
  });

  test('Compute 2 frames - rotY - and compose them into a third one', () => {
    const o1 = Point.fromValues(1, 1, 1);
    const f1 = Frame.rotationY(o1, rad2deg(90));
    const f2 = f1.invert();
    const f1f2 = f1.map(f2);

    expect(round(f1f2.o.x, prec)).toBe(0);
    expect(round(f1f2.o.y, prec)).toBe(0);
    expect(round(f1f2.o.z, prec)).toBe(0);
  });

  test('Compute 2 frames - RotZ - and compose them into a third one', () => {
    const o1 = Point.fromValues(1, 1, 1);
    const f1 = Frame.rotationZ(o1, rad2deg(90));
    const f2 = f1.invert();
    const f1f2 = f1.map(f2);

    expect(round(f1f2.o.x, prec)).toBe(0);
    expect(round(f1f2.o.y, prec)).toBe(0);
    expect(round(f1f2.o.z, prec)).toBe(0);
  });

  test('Create 2 frames and get one as relative to the other', () => {
    const f1 = Frame.from2Vectors(Point.fromValues(10, 10, 10), Vector.fromValues(0, 0, 1), Vector.fromValues(1, 0, 0));
    const f2 = Frame.lookAt(Point.fromValues(10, 10, 10), Point.fromValues(20, 20, 0), UnitVector.fromValues(0, 1, 0));

    const f1f2 = f2.relative(f1);
    expect(f1f2.o.x).toBe(0);
    expect(f1f2.o.y).toBe(0);
    expect(f1f2.o.z).toBe(0);
  });
});