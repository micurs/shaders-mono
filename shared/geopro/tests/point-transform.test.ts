import { describe, test, expect } from 'vitest';

import { Point, Transform, round } from '../src';

describe('Transform points', () =>{
  const precision = 6;

  test('Transform a point with identity returns the same point', () => {
    const p = Point.fromValues(10, 20, 15);
    const t1 = Transform.identity();
    const t2 = Transform.invert(t1);

    expect(t1.isFrame()).toBe(false);

    const p1 = p.map(t1);
    const p2 = p.map(t2);
    expect(p1.x).toBe(10);
    expect(p1.y).toBe(20);
    expect(p1.z).toBe(15);
    expect(p2.x).toBe(10);
    expect(p2.y).toBe(20);
    expect(p2.z).toBe(15);
  });

  test('Transform a point with a translation', () => {
    const p = Point.fromValues(10, 20, 15);
    const t1 = Transform.translation(10, 20, 30);
    const t2 = Transform.invert(t1);
    const p1 = p.map(t1);
    const p2 = p.map(t2);
    expect(p1.x).toBe(20);
    expect(p1.y).toBe(40);
    expect(p1.z).toBe(45);
    expect(p2.x).toBe(0);
    expect(p2.y).toBe(0);
    expect(p2.z).toBe(-15);
  });

  test('Transform a point with a rotation X', () => {
    const p = Point.fromValues(0, 1, 0);
    const t1 = Transform.rotationX(Math.PI/2);
    const t2 = Transform.invert(t1);
    const p1 = p.map(t1);
    const p2 = p.map(t2);
    expect(round(p1.x, precision)).toBe(0);
    expect(round(p1.y, precision)).toBe(0);
    expect(round(p1.z, precision)).toBe(1);
    expect(round(p2.x, precision)).toBe(0);
    expect(round(p2.y, precision)).toBe(0);
    expect(round(p2.z, precision)).toBe(-1);

    const p0 = p1.map(t2);
    expect(round(p0.x, precision)).toBe(0);
    expect(round(p0.y, precision)).toBe(1);
    expect(round(p0.z, precision)).toBe(0);
  });

  test('transform a point with a rotation on Y', () => {
    const p = Point.fromValues(1, 0, 0);
    const t1 = Transform.rotationY(Math.PI/2);
    const t2 = Transform.invert(t1);
    const p1 = p.map(t1);
    const p2 = p.map(t2);
    expect(round(p1.x, precision)).toBe(0);
    expect(round(p1.y, precision)).toBe(0);
    expect(round(p1.z, precision)).toBe(-1);
    expect(round(p2.x, precision)).toBe(0);
    expect(round(p2.y, precision)).toBe(0);
    expect(round(p2.z, precision)).toBe(1);

    const p0 = p1.map(t2);
    expect(round(p0.x, precision)).toBe(1);
    expect(round(p0.y, precision)).toBe(0);
    expect(round(p0.z, precision)).toBe(0);
  });

  test('transform a point with a rotation on Z', () => {
    const p = Point.fromValues(1, 0, 0);
    const t1 = Transform.rotationZ(Math.PI/2);
    const t2 = Transform.invert(t1);
    const p1 = p.map(t1);
    const p2 = p.map(t2);
    expect(round(p1.x, precision)).toBe(0);
    expect(round(p1.y, precision)).toBe(1);
    expect(round(p1.z, precision)).toBe(0);
    expect(round(p2.x, precision)).toBe(0);
    expect(round(p2.y, precision)).toBe(-1);
    expect(round(p2.z, precision)).toBe(0);

    const p0 = p1.map(t2);
    expect(round(p0.x, precision)).toBe(1);
    expect(round(p0.y, precision)).toBe(0);
    expect(round(p0.z, precision)).toBe(0);
  });

  test('transform a point with a scale', () => {
    const p = Point.fromValues(1, 3, 2);
    const t1 = Transform.scale(2, 3, 4);
    const t2 = Transform.invert(t1);
    const p1 = p.map(t1);
    const p2 = p.map(t2);
    expect(round(p1.x, precision)).toBe(2);
    expect(round(p1.y, precision)).toBe(9);
    expect(round(p1.z, precision)).toBe(8);
    expect(round(p2.x, precision)).toBe(0.5);
    expect(round(p2.y, precision)).toBe(1);
    expect(round(p2.z, precision)).toBe(0.5);

    const p0 = p1.map(t2);
    expect(round(p0.x, precision)).toBe(1);
    expect(round(p0.y, precision)).toBe(3);
    expect(round(p0.z, precision)).toBe(2);
  })

});