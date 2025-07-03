import { describe, test, expect } from 'vitest';

import { Transform, UnitVector, deg2rad, Frame, Point } from '../src';

describe('UnitVector transformations', () => {
  test('UnitVector.map(t) on a translation returns the same UnitVector', () => {
    const v = UnitVector.fromValues(10, 20, 15);
    const t = Transform.translation(2, 2, 2);

    const v2 = v.map(t);
    expect(v2.x).toBeCloseTo(v.x);
    expect(v2.y).toBeCloseTo(v.y);
    expect(v2.z).toBeCloseTo(v.z);
  });

  test('UnitVector.map(t) on a rotation returns a rotated UnitVector', () => {
    const v = UnitVector.fromValues(1, 0, 0);
    const t = Transform.rotationZ(deg2rad(180));

    const v2 = v.map(t);
    expect(v2.x).toBeCloseTo(-1);
    expect(v2.y).toBeCloseTo(0);
    expect(v2.z).toBeCloseTo(0);

    const v3 = v2.unMap(t);
    expect(v3.x).toBeCloseTo(v.x);
    expect(v3.y).toBeCloseTo(v.y);
    expect(v3.z).toBeCloseTo(v.z);
  });

  test('UnitVector.map(f) on a frame returns a transformed UnitVector', () => {
    const v = UnitVector.fromValues(1, 0, 0);
    const f = Frame.rotationZ(Point.fromValues(0,0,0), deg2rad(90));

    const v2 = v.map(f);
    expect(v2.x).toBeCloseTo(0);
    expect(v2.y).toBeCloseTo(-1);
    expect(v2.z).toBeCloseTo(0);

    const v3 = v2.unMap(f);
    expect(v3.x).toBeCloseTo(1);
    expect(v3.y).toBeCloseTo(0);
    expect(v3.z).toBeCloseTo(0);
  });

  test('UnitVector.map(t) on a generic transform returns a transformed UnitVector', () => {
    const v = UnitVector.fromValues(1, 0, 0);
    const t = Transform.fromMat4([
      1, 0, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 0,
      0, 0, 0, 1,
    ]);

    const v2 = v.map(t);
    expect(v2.x).toBeCloseTo(1);
    expect(v2.y).toBeCloseTo(0);
    expect(v2.z).toBeCloseTo(0);

    const v3 = v2.unMap(t);
    expect(v3.x).toBeCloseTo(1);
    expect(v3.y).toBeCloseTo(0);
    expect(v3.z).toBeCloseTo(0);
  });
});
