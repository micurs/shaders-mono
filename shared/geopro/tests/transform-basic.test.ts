import { describe, test, expect } from 'vitest';
import { mat4, vec4 } from 'gl-matrix';

import { Point, Transform, Vector, deg2rad } from '../src';

describe('Transform basic operations', () => {
  test('Create a transformation from a Mat4', () => {
    const m1 = mat4.create();
    mat4.translate(m1, m1, [10, 10, 10]);
    mat4.rotateX(m1, m1, deg2rad(45));
    mat4.rotateY(m1, m1, deg2rad(45));
    const t1 = Transform.fromMat4(m1);
    const p1 = Point.fromValues(10, 10, 10);

    const tv = vec4.create();
    vec4.transformMat4(tv, p1.vec4(), m1);

    const tp = t1.apply(p1);
    expect(tp.vec4()).toEqual(tv);

    expect(t1.buffer().byteLength).toBe(16 * 4);
    expect(t1.isIdentity).toBe(false);
  });

  test('Create a transformation and make sure the invert works as expected', () => {
    const m1 = mat4.create();
    mat4.translate(m1, m1, [10, 10, 10]);
    mat4.rotateX(m1, m1, deg2rad(45));
    mat4.rotateY(m1, m1, deg2rad(45));
    const t1 = Transform.fromMat4(m1);

    const p1 = Point.fromValues(10, 10, 10);
    const p2 = p1.map(t1);

    const t2 = t1.invert();
    const p3 = p2.map(t2);

    expect(p1.vec3()).toEqual(p3.vec3());
  });

  test('Create tw transformation and make sure their composition works as expected', () => {
    const m1 = mat4.create();
    const m2 = mat4.create();
    mat4.translate(m1, m1, [10, 10, 10]);
    mat4.rotateX(m1, m1, deg2rad(45));
    mat4.translate(m2, m2, [10, 10, 10]);
    mat4.rotateY(m2, m2, deg2rad(45));

    const t1 = Transform.fromMat4(m1);
    const t2 = Transform.fromMat4(m2);
    const t3 = t1.compose(t2);

    const p1 = Point.fromValues(10, 10, 10);
    const p2 = p1.map(t1);
    const p3 = p2.map(t2);
    const p4 = p1.map(t3);

    expect(p3.vec3()).toEqual(p4.vec3());
  });

  test('Create a transformation with a move vector', () => {
    const t1 = Transform.move(Vector.fromValues(10, 10, 10));
    const p1 = Point.fromValues(10, 10, 10);
    const p2 = p1.map(t1);
    expect(p2.coordinates).toEqual([20, 20, 20, 1]);
  });
});
