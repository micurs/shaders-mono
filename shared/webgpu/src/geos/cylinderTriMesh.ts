import { Point, UnitVector, Vector, Transform } from '@shaders-mono/geopro';
import { TriangleData } from '../triangle-data';
import { computeNormals } from './utils';
import { RGBAColor } from '..';

const disc = (step: number, z: number, facing: 'up' | 'down', t: Transform): [number[], number[]] => {
  const r = 0.5;
  const coordinates: number[] = [];
  const alphaStart = facing === 'up' ? 0 : Math.PI * 2;
  const alphaStep = facing === 'up' ? Math.PI / step : -Math.PI / step;
  const pred = facing === 'up' ? (alpha: number) => alpha < Math.PI * 2 : (alpha: number) => alpha > 0;
  for (let alpha = alphaStart; pred(alpha); alpha += alphaStep) {
    const pt0 = Point.fromValues(0, 0, z).map(t);
    const pt1 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), z).map(t);
    const pt2 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), z).map(t);
    coordinates.push(...pt0.triplet);
    coordinates.push(...pt1.triplet);
    coordinates.push(...pt2.triplet);
  }
  return [coordinates, computeNormals(coordinates)];
};

const pipe = (step: number, bottom: number, top: number, t: Transform): [number[], number[]] => {
  const r = 0.5;
  const coordinates: number[] = [];
  const normals: number[] = [];
  const alphaStep = Math.PI / step;
  const centerBottomPt = Point.fromValues(0, 0, bottom).map(t);
  const centerTopPt = Point.fromValues(0, 0, top).map(t);

  for (let alpha = 0; alpha < Math.PI * 2; alpha += alphaStep) {
    const pt1 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), bottom).map(t);
    const nm1 = UnitVector.fromVector(Vector.fromPoints(centerBottomPt, pt1));
    coordinates.push(...pt1.triplet);
    normals.push(...nm1.triplet);

    const pt2 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), bottom).map(t);
    const nm2 = UnitVector.fromVector(Vector.fromPoints(centerBottomPt, pt2));
    coordinates.push(...pt2.triplet);
    normals.push(...nm2.triplet);

    const pt3 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), top).map(t);
    const nm3 = UnitVector.fromVector(Vector.fromPoints(centerTopPt, pt3));
    coordinates.push(...pt3.triplet);
    normals.push(...nm3.triplet);

    const pt4 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), top).map(t);
    const nm4 = UnitVector.fromVector(Vector.fromPoints(centerTopPt, pt4));
    coordinates.push(...pt4.triplet);
    normals.push(...nm4.triplet);

    const pt5 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), bottom).map(t);
    const nm5 = UnitVector.fromVector(Vector.fromPoints(centerBottomPt, pt5));
    coordinates.push(...pt5.triplet);
    normals.push(...nm5.triplet);

    const pt6 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), top).map(t);
    const nm6 = UnitVector.fromVector(Vector.fromPoints(centerTopPt, pt6));
    coordinates.push(...pt6.triplet);
    normals.push(...nm6.triplet);
  }
  return [coordinates, normals];
};

export const cylinderTriMesh = (steps: number, color: RGBAColor, t: Transform) => {
  const coordinates = [];
  const normals = [];
  const [v1, n1] = disc(steps, 0.5, 'up', t);
  const [v2, n2] = disc(steps, -0.5, 'down', t);
  const [v3, n3] = pipe(steps, -0.5, 0.5, t);
  coordinates.push(...v1);
  coordinates.push(...v2);
  coordinates.push(...v3);
  normals.push(...n1);
  normals.push(...n2);
  normals.push(...n3);

  const triangleData = new TriangleData(new Float32Array(coordinates), coordinates.length / 3, color);
  triangleData.addNormals(new Float32Array(normals));
  return triangleData;
};
