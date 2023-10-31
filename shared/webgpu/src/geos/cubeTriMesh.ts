import { Point, Transform } from '@shaders-mono/geopro';
import { TriangleData } from '../triangle-data';
import { computeNormals } from './utils';
import { RGBAColor } from '../types';


export const cubeTriMesh = (t: Transform, color?: RGBAColor) => {
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
  const triangleData = new TriangleData(new Float32Array(coordinates), coordinates.length / 3, color);

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
