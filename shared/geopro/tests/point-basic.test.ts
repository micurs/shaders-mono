import { describe, test, expect } from 'vitest';
import { vec4, vec3 } from 'gl-matrix';

import { Point } from '../src';

describe('Point basic operations', () => {

  test('Set a point with coordinates', () => {
    const v3 = vec3.fromValues(10, 20, 15);
    const v4 = vec4.fromValues(10, 20, 15, 1);

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
    const v1 = vec4.fromValues(10, 20, 15, 10);
    const v2 = vec4.fromValues(10, 20, 15, 0);
    const p1 = Point.fromVec4(v1);
    const p2 = Point.fromVec4(v2);
    expect(p1.x).toBe(1);
    expect(p1.y).toBe(2);
    expect(p1.z).toBe(1.5);
    expect(p2.x).toBe(10);
    expect(p2.y).toBe(20);
    expect(p2.z).toBe(15);
  });

  test('Set a point with a vec3', () => {
    const v = vec3.fromValues(10, 20, 15);
    const p = Point.fromVec3(v);
    expect(p.x).toBe(10);
    expect(p.y).toBe(20);
    expect(p.z).toBe(15);
  });

  test('Get a String from a Point', () => {
    const p = Point.fromValues(10, 20, 15);
    expect(p.toString()).toBe('Point(10, 20, 15)');
  });

  test('Subtract 2 points returns a vector', () => {
    const p1 = Point.fromValues(10, 20, 15);
    const p2 = Point.fromValues(0, 10, 5);
    const v = p1.subtract(p2);
    expect(v.x).toBe(10);
    expect(v.y).toBe(10);
    expect(v.z).toBe(10);
  });

  test('Scale a point gets a new point', () => {
    const p1 = Point.fromValues(10, 20, 15);
    const p2 = p1.scale(2);
    expect(p2.x).toBe(20);
    expect(p2.y).toBe(40);
    expect(p2.z).toBe(30);
  });

});