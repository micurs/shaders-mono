import { describe, test, expect } from 'vitest';
import { vec4, vec3 } from 'gl-matrix';

import { UnitVector, round, Vector } from '../src';


describe('UnitVector basic operations', () => {
  const precision = 6;

  test('Set a unit-vector with coordinates', () => {
    const vec = UnitVector.fromValues(10, 20, 15);
    const l = Math.sqrt(10*10 + 20*20 + 15*15);
    expect(round(vec.x, precision)).toBe(round(10/l, precision));
    expect(round(vec.y, precision)).toBe(round(20/l, precision));
    expect(round(vec.z, precision)).toBe(round(15/l, precision));
    expect(vec.coordinates.map(n => round(n, precision))).toEqual([
      round(10/l, precision),
      round(20/l, precision),
      round(15/l, precision), 0]);
    expect(vec.isUnitVector()).toBe(true);
    expect(vec.length).toBe(1.0);

  });

  test('Set a unit-vector from a vector', () => {
    const vec = UnitVector.fromVector(Vector.fromValues(10, 20, 15));
    const l = Math.sqrt(10*10 + 20*20 + 15*15);
    expect(round(vec.x, precision)).toBe(round(10/l, precision));
    expect(round(vec.y, precision)).toBe(round(20/l, precision));
    expect(round(vec.z, precision)).toBe(round(15/l, precision));

  });

  test('Set a unit-vector from a vec3', () => {
    const vec = UnitVector.fromVec3(vec3.fromValues(10, 20, 15));
    const l = Math.sqrt(10*10 + 20*20 + 15*15);
    expect(round(vec.x, precision)).toBe(round(10/l, precision));
    expect(round(vec.y, precision)).toBe(round(20/l, precision));
    expect(round(vec.z, precision)).toBe(round(15/l, precision));
  });

  test('Set a unit-vector from a vec4', () => {
    const vec = UnitVector.fromVec4(vec4.fromValues(10, 20, 15, 7));
    const l = Math.sqrt( 10/7*10/7 + 20/7*20/7 + 15/7*15/7);
    expect(round(vec.x, precision)).toBe(round(10/7/l, precision));
    expect(round(vec.y, precision)).toBe(round(20/7/l, precision));
    expect(round(vec.z, precision)).toBe(round(15/7/l, precision));
  });

  test('Get a String from a UnitVector', () => {
    const v = UnitVector.fromValues(10, 20, 15);
    expect(v.toString()).toEqual('UnitVector(0.3713906705379486, 0.7427813410758972, 0.5570859909057617)');
  });

  test('crossProduct of UnitVectors returns a UnitVector perpendicular to both', () => {
    const v1 = UnitVector.fromValues(1,0,0);
    const v2 = UnitVector.fromValues(0,1,0);
    const v3 = UnitVector.crossProduct(v1, v2);
    expect(v3.x).toBe(0);
    expect(v3.y).toBe(0);
    expect(v3.z).toBe(1);
    expect(v3.isUnitVector()).toBe(true);
  });

});
