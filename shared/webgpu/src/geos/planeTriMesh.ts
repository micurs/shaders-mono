import { Point, Transform } from '@shaders-mono/geopro';
import { GeoOptions, TriGenerator } from '../types';
import { computeNormals } from './utils';
import { TriangleData } from '../triangle-data';

const logN = (n: number, base: number) => Math.log(n) / Math.log(base);

/**
 * Build a plane mesh on the XY plane
 * @param t - The transformation to orient the plane as you want
 * @param color - color or texture to apply to the plane
 */
export const planeTriMesh: TriGenerator = (t: Transform, options: GeoOptions<{}>) => {
  const { color } = options;

  // 0 - Determine the scale of the plane (x/y)
  const s = t.scaleVector;

  const maxDim = Math.max(s.x, s.y);

  const base = 5;

  // Compute the tile dimension based in the max dimension of the plane
  const tileDim = Math.pow(base, Math.floor(logN(maxDim, base))) / base;

  const nx = Math.ceil(s.x / tileDim);
  const ny = Math.ceil(s.y / tileDim);
  const stepX = 1.0 / nx;
  const stepY = 1.0 / ny;

  const ptStrips: Point[][] = [];

  for (let col = 0; col < nx; col++) {
    ptStrips.push([]); // Add the new column
    ptStrips[col].push(Point.fromValues(-0.5, -0.5 + stepY, 0).map(t));
    ptStrips[col].push(Point.fromValues(-0.5, -0.5, 0).map(t));
    for (let row = 1; row < ny; row++) {
      ptStrips[col].push(Point.fromValues(-0.5 + stepX * col, -0.5 + stepY * (row + 1), 0).map(t));
      ptStrips[col].push(Point.fromValues(-0.5 + stepX * (col + 1), -0.5 + stepY * (row + 1), 0).map(t));
    }
  }

  return ptStrips
    .map((strip) => strip.flatMap((p) => p.triplet))
    .map((coords) => {
      const normals = computeNormals(coords);
      return [new Float32Array(coords), new Float32Array(normals)];
    })
    .reduce((triangleData: TriangleData, [coords, normals]) => {
      triangleData.addVertices(coords);
      triangleData.addNormals(normals);
      return triangleData;
    }, new TriangleData('triangle-strip', color))!;
};
