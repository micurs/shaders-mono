import { describe, test, expect } from 'vitest';

import { Point, Ray, UnitVector, Vector } from '../src';

describe('Ray basic operations', () =>{

  test('Create a ray from two points', () => {
    const o = Point.fromValues(10, 10, 10);
    const d = Point.fromValues(15, 15, 15);
    const uv = UnitVector.fromValues(5, 5, 5);

    const r = Ray.fromPoints(o, d);
    expect(r.o.x).toBeCloseTo(10);
    expect(r.o.y).toBeCloseTo(10);
    expect(r.o.z).toBeCloseTo(10);
    expect(r.d.x).toBeCloseTo(uv.x);
    expect(r.d.y).toBeCloseTo(uv.y);
    expect(r.d.z).toBeCloseTo(uv.z);
  });

  test('Create a ray from a point and a vector', () => {
    const o = Point.fromValues(10, 10, 10);
    const d = Vector.fromValues(5, 5, 5);
    const uv = UnitVector.fromValues(5, 5, 5);
    const r = Ray.fromPointAndVector(o, d);
    expect(r.o.x).toBeCloseTo(10);
    expect(r.o.y).toBeCloseTo(10);
    expect(r.o.z).toBeCloseTo(10);
    expect(r.d.x).toBeCloseTo(uv.x);
    expect(r.d.y).toBeCloseTo(uv.y);
    expect(r.d.z).toBeCloseTo(uv.z);
  });

  test('Create a ray from a point and a unit vector', () => {
    const o = Point.fromValues(10, 10, 10);
    const uv = UnitVector.fromValues(5, 5, 5);
    const r = Ray.fromPointAndVector(o, uv);
    expect(r.o.x).toBe(10);
    expect(r.o.y).toBe(10);
    expect(r.o.z).toBe(10);
    expect(r.d).toEqual(uv);
  });

});