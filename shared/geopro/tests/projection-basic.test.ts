import { describe, test, expect } from 'vitest';

import { Projection, Point, Vector, Transform, deg2rad } from '../src';

describe('Projection basics', () => {
  test('identity behaves like no-op and invert returns same', () => {
    const p = Projection.identity();
    expect(p.isFrame()).toBe(false);
    const inv = p.invert();
    const v = Vector.fromValues(1, 2, 3);
    const pv = v.map(p);
    const pvi = pv.map(inv);
    expect(pvi.x).toBeCloseTo(v.x);
    expect(pvi.y).toBeCloseTo(v.y);
    expect(pvi.z).toBeCloseTo(v.z);
  });

  test('fromMat4 roundtrip on points', () => {
    const t = Transform.rotationZ(deg2rad(45)).translation(1, 2, 3);
    const p = Projection.fromMat4(t.directMatrix);
    const inv = p.invert();
    const pt = Point.fromValues(2, 0, -1);
    const mapped = pt.map(p);
    const round = mapped.map(inv);
    expect(round.x).toBeCloseTo(pt.x);
    expect(round.y).toBeCloseTo(pt.y);
    expect(round.z).toBeCloseTo(pt.z);
  });

  test('perspective roundtrip on points (ignoring perspective divide)', () => {
    const p = Projection.perspective(deg2rad(60), 16 / 9, 0.1, 100);
    const inv = p.invert();
    const pt = Point.fromValues(1, 2, -5);
    const mapped = pt.map(p);
    const round = mapped.map(inv);
    expect(round.x).toBeCloseTo(pt.x);
    expect(round.y).toBeCloseTo(pt.y);
    expect(round.z).toBeCloseTo(pt.z);
  });

  test('orthographic roundtrip on points', () => {
    const p = Projection.orthographic(-1, 1, -1, 1, 0.1, 100);
    const inv = p.invert();
    const pt = Point.fromValues(0.3, -0.2, -5);
    const mapped = pt.map(p);
    const round = mapped.map(inv);
    expect(round.x).toBeCloseTo(pt.x);
    expect(round.y).toBeCloseTo(pt.y);
    expect(round.z).toBeCloseTo(pt.z);
  });

  test('composition order matches Transform composition semantics', () => {
    const p1 = Projection.orthographic(-2, 2, -1, 1, 0.1, 100);
    const p2 = Projection.perspective(deg2rad(70), 4 / 3, 0.1, 100);
    const pc = p1.compose(p2);
    const tc = Transform.fromMat4(p1.directMatrix).compose(Transform.fromMat4(p2.directMatrix));

    const pt = Point.fromValues(0.5, 0.25, -2);
    const v1 = pt.map(pc);
    const v2 = pt.map(tc);
    expect(v1.x).toBeCloseTo(v2.x);
    expect(v1.y).toBeCloseTo(v2.y);
    expect(v1.z).toBeCloseTo(v2.z);
  });
});


