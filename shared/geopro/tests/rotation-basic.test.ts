import { describe, test, expect } from 'vitest';
import { quat, mat3, mat4, vec3 } from 'gl-matrix';

import { Rotation, Transform, Vector, Point, deg2rad } from '../src';

const closeToArr = (a: number[], b: number[], tol = 1e-5) => {
  expect(a.length).toBe(b.length);
  for (let i = 0; i < a.length; i++) {
    expect(a[i]).toBeCloseTo(b[i], 5);
  }
};

describe('Rotation basics', () => {
  test('identity returns unit quaternion', () => {
    const r = Rotation.identity();
    const q = r.quat;
    // identity quaternion
    closeToArr([q[0], q[1], q[2], q[3]], [0, 0, 0, 1]);
  });

  test('fromValues and fromArray create the same rotation', () => {
    const q = quat.create();
    quat.setAxisAngle(q, vec3.fromValues(1, 0, 0), Math.PI / 3);
    const r1 = Rotation.fromValues(q[0], q[1], q[2], q[3]);
    const r2 = Rotation.fromArray([q[0], q[1], q[2], q[3]]);
    closeToArr([...r1.quat], [...r2.quat]);
  });

  test('fromQuat matches fromValues', () => {
    const q = quat.create();
    quat.setAxisAngle(q, vec3.fromValues(0, 1, 0), Math.PI / 4);
    const r1 = Rotation.fromQuat(q);
    const r2 = Rotation.fromValues(q[0], q[1], q[2], q[3]);
    closeToArr([...r1.quat], [...r2.quat]);
  });

  test('rotationX rotates vector as expected', () => {
    const r = Rotation.rotationX(Math.PI / 2);
    const t = Transform.fromRotation(r);
    const v = Vector.fromValues(0, 1, 0);
    const vr = v.map(t);
    expect(vr.x).toBeCloseTo(0);
    expect(vr.y).toBeCloseTo(0);
    expect(vr.z).toBeCloseTo(1);
  });

  test('rotationY rotates vector as expected', () => {
    const r = Rotation.rotationY(Math.PI / 2);
    const t = Transform.fromRotation(r);
    const v = Vector.fromValues(1, 0, 0);
    const vr = v.map(t);
    expect(vr.x).toBeCloseTo(0);
    expect(vr.y).toBeCloseTo(0);
    expect(vr.z).toBeCloseTo(-1);
  });

  test('rotationZ rotates vector as expected', () => {
    const r = Rotation.rotationZ(Math.PI / 2);
    const t = Transform.fromRotation(r);
    const v = Vector.fromValues(1, 0, 0);
    const vr = v.map(t);
    expect(vr.x).toBeCloseTo(0);
    expect(vr.y).toBeCloseTo(1);
    expect(vr.z).toBeCloseTo(0);
  });

  test('fromAngles equals composition of rotateX->rotateY->rotateZ', () => {
    const ax = deg2rad(20);
    const ay = deg2rad(35);
    const az = deg2rad(15);
    const r1 = Rotation.fromAngles(ax, ay, az);
    const r2 = Rotation.rotationX(ax).rotateY(ay).rotateZ(az);
    const t1 = Transform.fromRotation(r1);
    const t2 = Transform.fromRotation(r2);
    const v = Vector.fromValues(0.2, 0.4, 0.6);
    const v1 = v.map(t1);
    const v2 = v.map(t2);
    expect(v1.x).toBeCloseTo(v2.x);
    expect(v1.y).toBeCloseTo(v2.y);
    expect(v1.z).toBeCloseTo(v2.z);
  });

  test('compose combines rotations (documented current order)', () => {
    const rX = Rotation.rotationX(deg2rad(90));
    const rY = Rotation.rotationY(deg2rad(90));
    const rXY = rX.compose(rY);
    const tXY = Transform.fromRotation(rXY);
    // Current compose applies the right operand first (rY) then the left (rX)
    const tExpected = Transform.fromRotation(rY).compose(Transform.fromRotation(rX));
    const v = Vector.fromValues(0, 0, 1);
    const v1 = v.map(tXY);
    const v2 = v.map(tExpected);
    expect(v1.x).toBeCloseTo(v2.x);
    expect(v1.y).toBeCloseTo(v2.y);
    expect(v1.z).toBeCloseTo(v2.z);
  });

  test('inverse inverts rotation', () => {
    const r = Rotation.rotationZ(deg2rad(33));
    const rinv = r.inverse();
    const rId = r.compose(rinv);
    const tId = Transform.fromRotation(rId);
    const v = Vector.fromValues(1, 2, 3);
    const vId = v.map(tId);
    expect(vId.x).toBeCloseTo(v.x);
    expect(vId.y).toBeCloseTo(v.y);
    expect(vId.z).toBeCloseTo(v.z);
  });

  test('fromTransform extracts rotation (ignores translation for vectors)', () => {
    const m = mat4.create();
    // translate and rotate
    mat4.translate(m, m, [10, 20, 30]);
    mat4.rotateX(m, m, deg2rad(25));
    mat4.rotateY(m, m, deg2rad(-15));
    const t = Transform.fromMat4(m);
    const r = Rotation.fromTransform(t);
    const tRotOnly = Transform.fromRotation(r);
    // Vectors ignore translation, so mapping with t or tRotOnly must match
    const v = Vector.fromValues(0.3, -1.2, 2.5);
    const v1 = v.map(t);
    const v2 = v.map(tRotOnly);
    expect(v1.x).toBeCloseTo(v2.x);
    expect(v1.y).toBeCloseTo(v2.y);
    expect(v1.z).toBeCloseTo(v2.z);
  });
});


