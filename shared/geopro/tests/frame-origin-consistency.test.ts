import { describe, test, expect } from 'vitest';

import { Frame, Point, Vector, UnitVector, deg2rad } from '../src';

describe('Frame origin consistency', () => {
  test('origin equals o for world frame', () => {
    const f = Frame.world();
    expect(f.origin.x).toBeCloseTo(f.o.x);
    expect(f.origin.y).toBeCloseTo(f.o.y);
    expect(f.origin.z).toBeCloseTo(f.o.z);
  });

  test('origin equals o for translation frame', () => {
    const o = Point.fromValues(10, 20, 30);
    const f = Frame.translation(o);
    expect(f.origin.x).toBeCloseTo(o.x);
    expect(f.origin.y).toBeCloseTo(o.y);
    expect(f.origin.z).toBeCloseTo(o.z);

    expect(f.o.x).toBeCloseTo(o.x);
    expect(f.o.y).toBeCloseTo(o.y);
    expect(f.o.z).toBeCloseTo(o.z);
  });

  test('origin equals o for rotation frame around Z', () => {
    const o = Point.fromValues(5, 6, 7);
    const f = Frame.rotationZ(o, deg2rad(90));
    expect(f.origin.x).toBeCloseTo(o.x);
    expect(f.origin.y).toBeCloseTo(o.y);
    expect(f.origin.z).toBeCloseTo(o.z);

    expect(f.o.x).toBeCloseTo(o.x);
    expect(f.o.y).toBeCloseTo(o.y);
    expect(f.o.z).toBeCloseTo(o.z);
  });

  test('origin equals o for frame created from two vectors', () => {
    const o = Point.fromValues(1, 2, 3);
    const v1 = Vector.fromValues(0, 0, 1);
    const v2 = UnitVector.fromValues(1, 0, 0);
    const f = Frame.from2Vectors(o, v1, v2);

    expect(f.origin.x).toBeCloseTo(o.x);
    expect(f.origin.y).toBeCloseTo(o.y);
    expect(f.origin.z).toBeCloseTo(o.z);

    expect(f.o.x).toBeCloseTo(o.x);
    expect(f.o.y).toBeCloseTo(o.y);
    expect(f.o.z).toBeCloseTo(o.z);
  });
});



