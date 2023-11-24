import { Point, Transform } from '@shaders-mono/geopro';
import { GeoOptions, GeoGenerator } from '../types';
import { computeNormals } from './geo-utils';
import { GeoRenderable } from '../geo-renderable';
import { logN } from '../internal/utils';

type PlaneTriMeshOptions = {
  steps: number;
};

interface PlaneGenerator<B> extends GeoGenerator<B, PlaneTriMeshOptions> {}
/**
 * Build a plane mesh on the XY plane
 * @param t - The transformation to orient the plane as you want
 * @param color - color or texture to apply to the plane
 */
const planGenerator: PlaneGenerator<any> = <B>(t: Transform, options: GeoOptions<PlaneTriMeshOptions>): GeoRenderable<B> => {
  const { steps, id } = options;

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
    .map((stripPoints) => {
      const normals = computeNormals('triangle-strip', stripPoints);
      return [new Float32Array(stripPoints.map((pt) => pt.triplet).flat()), new Float32Array(normals.map((n) => n.triplet).flat())];
    })
    .reduce((triangleData: GeoRenderable<B>, [coords, normals]) => {
      triangleData.addVertices(coords);
      triangleData.addNormals(normals);
      return triangleData;
    }, new GeoRenderable<B>(id, 'triangle-strip', options))
    .setCullMode('none');
};

export const planeTriMesh = <B = null>(): PlaneGenerator<B> => planGenerator;

