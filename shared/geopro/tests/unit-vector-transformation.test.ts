import { describe, test, expect } from 'vitest';

import { Transform, UnitVector, deg2rad } from '../src';

describe('UnitVector transformations', () => {
  test('UnitVector.map(t) on a translation returns the same UnitVector', () => {
    const v = UnitVector.fromValues(10, 20, 15);
    const t = Transform.translation(2, 2, 2);

    const v2 = v.map(t);
    expect(v2).toEqual(v);
  });

  test('UnitVector.map(t) on a rotation returns a rotated UnitVector', () => {
    const v = UnitVector.fromValues(1, 0, 0);
    const t = Transform.rotationZ(deg2rad(180));

    const v2 = v.map(t);
    expect(v2.x).toBeCloseTo(-1);
    expect(v2.y).toBeCloseTo(0);
    expect(v2.z).toBeCloseTo(0);

    const v3 = v2.unMap(t);
    expect(v3).toEqual(v);
  });
});
