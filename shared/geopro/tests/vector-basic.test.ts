import { describe, test, expect } from 'vitest';
import { vec4, vec3 } from 'gl-matrix';

import { Vector } from '../src';

describe('Vector basic operations', () => {

  test('Set a vector with coordinates', () => {
    const v3 = vec3.fromValues(10, 20, 15);
    const v4 = vec4.fromValues(10, 20, 15, 0);
    const vec = Vector.fromValues(10, 20, 15);
    expect(vec.x).toBe(10);
    expect(vec.y).toBe(20);
    expect(vec.z).toBe(15);
    expect(vec.isUnitVector()).toBe(false);
    expect(vec.coordinates).toEqual([10,20,15,0]);
    expect(vec.vec3()).toEqual(v3);
    expect(vec.vec4()).toEqual(v4);
  });

  test('Set a vector with a vec4', () => {
    const v = Vector.fromVec4([10, 20, 15, 10]);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(1.5);
  });

  test('Set a vector with a vec3', () => {
    const v = Vector.fromVec3([10, 20, 15]);
    expect(v.x).toBe(10);
    expect(v.y).toBe(20);
    expect(v.z).toBe(15);
  });


  test('Get the vector length', () => {
    const v = Vector.fromVec3([10, 20, 15]);
    expect(v.length).toBe(Math.sqrt(10*10 + 20*20 + 15*15));
  });

  test('crossProduct of Vectors returns a Vector perpendicular to both', () => {
    const v1 = Vector.fromValues(1,0,0);
    const v2 = Vector.fromValues(0,1,0);
    const v3 = Vector.crossProduct(v1, v2);
    expect(v3.x).toBe(0);
    expect(v3.y).toBe(0);
    expect(v3.z).toBe(1);
    expect(v3.isUnitVector()).toBe(false);
  });


});