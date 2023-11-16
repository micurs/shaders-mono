import { Point, Transform } from '@shaders-mono/geopro';
import { GeoOptions, GeoGenerator } from '../types';
import { logN } from '../internal/utils';
import { GeoRenderable } from '../geo-renderable';

interface PlaneOptions {
  steps: number;
}

interface PlaneGenerator<B> extends GeoGenerator<B, PlaneOptions> {}

export const planeGridLines: PlaneGenerator<any> = <B>(t: Transform, options: GeoOptions<PlaneOptions>): GeoRenderable<B> => {
  const { color, steps, id } = options;

  // 0 - Determine the scale of the plane (x/y)
  const s = t.scaleVector;

  const maxDim = Math.max(s.x, s.y);

  // Compute the tile dimension based in the max dimension of the plane
  const tileDim = Math.pow(steps, Math.floor(logN(maxDim, steps))) / steps;

  const nx = Math.floor(s.x / tileDim);
  const ny = Math.floor(s.y / tileDim);
  const stepX = 1.0 / nx;
  const stepY = 1.0 / ny;

  const pts: Point[] = [];

  // X lines
  for (let xCol = 0; xCol < nx + 1; xCol++) {
    const ptStart = Point.fromValues(-0.5 + stepX * xCol, -0.5, 0).map(t);
    const ptEnd = Point.fromValues(-0.5 + stepX * xCol, +0.5, 0).map(t);
    pts.push(ptStart, ptEnd);
  }
  for (let yRow = 0; yRow < ny + 1; yRow++) {
    const ptStart = Point.fromValues(-0.5, -0.5 + stepY * yRow, 0).map(t);
    const ptEnd = Point.fromValues(+0.5, -0.5 + stepY * yRow, 0).map(t);
    pts.push(ptStart, ptEnd);
  }

  const geo = new GeoRenderable<B>(id, 'line-list', color);
  geo.addVertices(new Float32Array(pts.flatMap((p) => p.triplet)));
  return geo;
};
