import { describe, test, expect } from 'vitest';
import { vec4, vec3 } from 'gl-matrix';

import { Point } from '../src';

describe('Point basic operations', () => {

  test('Set a point with coordinates', () => {
    const v3 = vec3.fromValues(10, 20, 15);
    const v4 = vec4.fromValues(10, 20, 15, 0);

    const p = Point.fromValues( 10, 20, 15);
    expect(p.x).toBe(10);
    expect(p.y).toBe(20);
    expect(p.z).toBe(15);
    expect(p.coordinates).toEqual([10,20,15,1]);
    expect(p.vec3()).toEqual(v3);
    expect(p.vec4()).toEqual(v4);
    expect(p.isPoint()).toBe(true);
  });

  test('Set a point with a vec4', () => {
    const v = vec4.fromValues(10, 20, 15, 10);
    const p = Point.fromVec4(v);
    expect(p.x).toBe(1);
    expect(p.y).toBe(2);
    expect(p.z).toBe(1.5);
  });

  test('Set a point with a vec3', () => {
    const v = vec3.fromValues(10, 20, 15);
    const p = Point.fromVec3(v);
    expect(p.x).toBe(10);
    expect(p.y).toBe(20);
    expect(p.z).toBe(15);
  });

});