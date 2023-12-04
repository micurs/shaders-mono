import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { GeoOptions, GeoGenerator } from '../types';
import { computeNormals } from './geo-utils';
import { GeoRenderable } from '../geo-renderable';

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
  const nt = t.transpose().invert();

  // 0 - Determine the scale of the plane (x/y)
  const s = t.scaleVector;

  const minDim = Math.min(s.x, s.y);

  // Compute the tile dimension based in the max dimension of the plane
  const tileDim = minDim / steps;

  const nx = Math.floor(s.x / tileDim);
  const ny = Math.floor(s.y / tileDim);
  const stepX = 1.0 / nx;
  const stepY = 1.0 / ny;

  const ptStrips: Point[][] = [];

  // Builds the plane in origin coordinates on XY plane (z = 0) and between -0.5 and 0.5
  for (let xCol = 0; xCol < nx; xCol++) {
    ptStrips.push([]);
    for (let yRow = 0; yRow < ny + 1; yRow++) {
      ptStrips[xCol].push(Point.fromValues(-0.5 + stepX * xCol, -0.5 + stepY * yRow, 0));
      ptStrips[xCol].push(Point.fromValues(-0.5 + stepX * (xCol + 1), -0.5 + stepY * yRow, 0));
    }
  }

  return ptStrips
    .map((stripPoints) => {
      const normals = computeNormals('triangle-strip', stripPoints);
      return [
        new Float32Array(stripPoints.map((pt) => pt.map(t).triplet).flat()),
        new Float32Array(normals.map((n) => n.map(nt).triplet).flat()), // Normals
        new Float32Array(stripPoints.map((_) => UnitVector.fromValues(1, 0, 0).map(nt).triplet).flat()), // Tangents
        new Float32Array(stripPoints.map((p) => [p.x + 0.5, p.y + 0.5]).flat()), // Texture coordinates
      ];
    })
    .reduce((triangleData: GeoRenderable<B>, [coords, normals, tangents, textures]) => {
      triangleData.addVertices(coords);
      triangleData.addNormals(normals);
      triangleData.addTangents(tangents);
      triangleData.addTextures(textures);
      return triangleData;
    }, new GeoRenderable<B>(id, 'triangle-strip', options))
    .setCullMode('none');
};

export const planeTriMesh = <B = null>(): PlaneGenerator<B> => planGenerator;
