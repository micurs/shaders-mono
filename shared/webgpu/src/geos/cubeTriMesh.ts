import { Point, Transform } from '@shaders-mono/geopro';
import { GeoRenderable } from '../geo-renderable';
import { computeNormals } from './utils';
import { GeoOptions, GeoGenerator } from '../types';

export const cubeTriMesh: GeoGenerator = (t: Transform, options: GeoOptions<{}>) => {
  const { color, id } = options;

  const points: Point[] = [
    Point.fromValues(0.5, -0.5, 0.5).map(t),
    Point.fromValues(-0.5, -0.5, 0.5).map(t),
    Point.fromValues(-0.5, -0.5, -0.5).map(t),

    Point.fromValues(0.5, -0.5, -0.5).map(t),
    Point.fromValues(0.5, -0.5, 0.5).map(t),
    Point.fromValues(-0.5, -0.5, -0.5).map(t),

    Point.fromValues(0.5, 0.5, 0.5).map(t),
    Point.fromValues(0.5, -0.5, 0.5).map(t),
    Point.fromValues(0.5, -0.5, -0.5).map(t),

    Point.fromValues(0.5, 0.5, -0.5).map(t),
    Point.fromValues(0.5, 0.5, 0.5).map(t),
    Point.fromValues(0.5, -0.5, -0.5).map(t),

    Point.fromValues(-0.5, 0.5, 0.5).map(t),
    Point.fromValues(0.5, 0.5, 0.5).map(t),
    Point.fromValues(0.5, 0.5, -0.5).map(t),

    Point.fromValues(-0.5, 0.5, -0.5).map(t),
    Point.fromValues(-0.5, 0.5, 0.5).map(t),
    Point.fromValues(0.5, 0.5, -0.5).map(t),

    Point.fromValues(-0.5, -0.5, 0.5).map(t),
    Point.fromValues(-0.5, 0.5, 0.5).map(t),
    Point.fromValues(-0.5, 0.5, -0.5).map(t),

    Point.fromValues(-0.5, -0.5, -0.5).map(t),
    Point.fromValues(-0.5, -0.5, 0.5).map(t),
    Point.fromValues(-0.5, 0.5, -0.5).map(t),

    Point.fromValues(0.5, 0.5, 0.5).map(t),
    Point.fromValues(-0.5, 0.5, 0.5).map(t),
    Point.fromValues(-0.5, -0.5, 0.5).map(t),

    Point.fromValues(-0.5, -0.5, 0.5).map(t),
    Point.fromValues(0.5, -0.5, 0.5).map(t),
    Point.fromValues(0.5, 0.5, 0.5).map(t),

    Point.fromValues(0.5, -0.5, -0.5).map(t),
    Point.fromValues(-0.5, -0.5, -0.5).map(t),
    Point.fromValues(-0.5, 0.5, -0.5).map(t),

    Point.fromValues(0.5, 0.5, -0.5).map(t),
    Point.fromValues(0.5, -0.5, -0.5).map(t),
    Point.fromValues(-0.5, 0.5, -0.5).map(t),
  ];

  const coordinates: number[] = points.flatMap((p) => p.triplet);
  const triangleData = new GeoRenderable(id, 'triangle-list', color);
  triangleData.addVertices(new Float32Array(coordinates));

  if (!color) {
    triangleData.addTextures(
      new Float32Array([
        //
        0, 1, 1, 1, 1, 0,

        0, 0, 0, 1, 1, 0,

        //
        0, 1, 1, 1, 1, 0,

        0, 0, 0, 1, 1, 0,

        //
        0, 1, 1, 1, 1, 0,

        0, 0, 0, 1, 1, 0,

        //
        0, 1, 1, 1, 1, 0,

        0, 0, 0, 1, 1, 0,

        //
        0, 1, 1, 1, 1, 0,

        1, 0, 0, 0, 0, 1,

        // //
        0, 1, 1, 1, 1, 0,

        0, 0, 0, 1, 1, 0,
      ])
    );
  }

  const normals = computeNormals('triangle-list', coordinates);
  triangleData.addNormals(new Float32Array(normals));

  return triangleData;
};
