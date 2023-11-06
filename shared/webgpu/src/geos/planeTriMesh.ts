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
export const planeTriMesh: TriGenerator<{ steps: number }> = (t: Transform, options: GeoOptions<{ steps: number }>) => {
  const { color, steps } = options;

  // 0 - Determine the scale of the plane (x/y)
  const s = t.scaleVector;

  const maxDim = Math.max(s.x, s.y);

  // Compute the tile dimension based in the max dimension of the plane
  const tileDim = Math.pow(steps, Math.floor(logN(maxDim, steps))) / steps;

  const nx = Math.floor(s.x / tileDim);
  const ny = Math.floor(s.y / tileDim);
  const stepX = 1.0 / nx;
  const stepY = 1.0 / ny;

  const ptStrips: Point[][] = [];

  for (let xCol = 0; xCol < nx; xCol++) {
    ptStrips.push([]);
    for (let yRow = 0; yRow < ny + 1; yRow++) {
      ptStrips[xCol].push(Point.fromValues(-0.5 + stepX * xCol, -0.5 + stepY * yRow, 0).map(t));
      ptStrips[xCol].push(Point.fromValues(-0.5 + stepX * (xCol + 1), -0.5 + stepY * yRow, 0).map(t));
    }
  }

  return ptStrips
    .map((strip) => strip.flatMap((p) => p.triplet))
    .map((coords) => {
      const normals = computeNormals('triangle-strip', coords);
      return [new Float32Array(coords), new Float32Array(normals)];
    })
    .reduce((triangleData: TriangleData, [coords, normals]) => {
      triangleData.addVertices(coords);
      triangleData.addNormals(normals);
      return triangleData;
    }, new TriangleData('triangle-strip', color))
    .setCullMode('none');
};
