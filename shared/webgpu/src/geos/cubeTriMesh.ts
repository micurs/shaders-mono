import { Point, Transform } from '@shaders-mono/geopro';
import { TriangleData } from '../triangle-data';
import { computeNormals } from './utils';
import { GeoOptions, TriGenerator } from '../types';

export const cubeTriMesh: TriGenerator = (t: Transform, options: GeoOptions<{}>) => {
  const { color } = options;

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
  const triangleData = new TriangleData('triangle-list', color);
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

  const normals = computeNormals(coordinates);
  triangleData.addNormals(new Float32Array(normals));

  return triangleData;
};
