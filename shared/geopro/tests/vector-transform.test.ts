import { describe, test, expect } from 'vitest';

import { Vector, Transform, round, Point, Ray } from '../src';

describe('Transform vector', () =>{
  const precision = 4;

  test('Transform a vector with identity returns the same vector', () => {
    const v = Vector.fromValues(10, 20, 15);
    const t1 = Transform.identity();
    const t2 = Transform.invert(t1);

    expect(t1.isFrame()).toBe(false);

    const v1 = v.map(t1);
    const v2 = v.map(t2);
    expect(v1.x).toBe(10);
    expect(v1.y).toBe(20);
    expect(v1.z).toBe(15);
    expect(v2.x).toBe(10);
    expect(v2.y).toBe(20);
    expect(v2.z).toBe(15);
  });

  test('Transform a vector with a rotation on X', () => {
    const v = Vector.fromValues(0, 10, 0);
    const t1 = Transform.rotationX(Math.PI / 2);
    const t2 = Transform.invert(t1);
    const v1 = v.map(t1);
    const v2 = v.unMap(t1);
    const v3 = v1.map(t2);
    expect(round(v1.x, precision)).toBe(0);
    expect(round(v1.y, precision)).toBe(0);
    expect(round(v1.z, precision)).toBe(10);
    expect(round(v2.x, precision)).toBe(0);
    expect(round(v2.y, precision)).toBe(0);
    expect(round(v2.z, precision)).toBe(-10);
    expect(round(v3.x, precision)).toBe(0);
    expect(round(v3.y, precision)).toBe(10);
    expect(round(v3.z, precision)).toBe(0);
  });

  test('Transform a vector with a rotation on Y', () => {
    const v = Vector.fromValues(10, 0, 0);
    const t1 = Transform.rotationY(Math.PI / 2);
    const t2 = Transform.invert(t1);
    const v1 = v.map(t1);
    const v2 = v.map(t2);
    expect(round(v1.x, precision)).toBe(0);
    expect(round(v1.y, precision)).toBe(0);
    expect(round(v1.z, precision)).toBe(-10);
    expect(round(v2.x, precision)).toBe(0);
    expect(round(v2.y, precision)).toBe(0);
    expect(round(v2.z, precision)).toBe(10);
  });

  test('Transform a vector with a rotation on Z', () => {
    const v = Vector.fromValues(0, 10, 0);
    const t1 = Transform.rotationZ(Math.PI / 2);
    const t2 = Transform.invert(t1);
    const v1 = v.map(t1);
    const v2 = v.map(t2);
    expect(round(v1.x, precision)).toBe(-10);
    expect(round(v1.y, precision)).toBe(0);
    expect(round(v1.z, precision)).toBe(0);
    expect(round(v2.x, precision)).toBe(10);
    expect(round(v2.y, precision)).toBe(0);
    expect(round(v2.z, precision)).toBe(0);
  });

  test('Transform a vector with a scale', () => {
    const v = Vector.fromValues(10, 20, 15);
    const t1 = Transform.scale(5, 4, 3);
    const t2 = Transform.invert(t1);
    const v1 = v.map(t1);
    const v2 = v.map(t2);
    expect(v1.x).toBe(50);
    expect(v1.y).toBe(80);
    expect(v1.z).toBe(45);
    expect(v2.x).toBe(2);
    expect(v2.y).toBe(5);
    expect(v2.z).toBe(5);
  });

  test('Transform a vector with a translation has no effect (vectors are not translatable)', () => {
    const v = Vector.fromValues(10, 20, 15);
    const t1 = Transform.translation(10, 2, 6);
    const t2 = Transform.invert(t1);
    const v1 = v.map(t1);
    const v2 = v.map(t2);
    expect(v1.x).toBe(10);
    expect(v1.y).toBe(20);
    expect(v1.z).toBe(15);
    expect(v2.x).toBe(10);
    expect(v2.y).toBe(20);
    expect(v2.z).toBe(15);
  });

  // test('Transform a vector with a rotation around an arbitrary axis', () => {
  //   const v = Vector.fromValues(0, 10, 0);
  //   const axesX = Ray.fromPoints(Point.origin(), Point.fromValues(1, 0, 0)); // Arbitrary X axis
  //   // const axesZ = Ray.fromPoints(Point.origin(), Point.fromValues(0, 0, 1)); // Arbitrary X axis

  //   const t1 = Transform.fromRotation(Math.PI / 2, axesX);
  //   const t2 = Transform.invert(t1);

  //   const v1 = v.map(t1);
  //   const v2 = v.unMap(t1);
  //   const v3 = v1.map(t2);
  //   expect(round(v1.x, precision)).toBe(0);
  //   expect(round(v1.y, precision)).toBe(0);
  //   expect(round(v1.z, precision)).toBe(-10);
  //   expect(round(v2.x, precision)).toBe(0);
  //   expect(round(v2.y, precision)).toBe(0);
  //   expect(round(v2.z, precision)).toBe(+10);
  //   expect(round(v3.x, precision)).toBe(0);
  //   expect(round(v3.y, precision)).toBe(10);
  //   expect(round(v3.z, precision)).toBe(0);
  // });
});
