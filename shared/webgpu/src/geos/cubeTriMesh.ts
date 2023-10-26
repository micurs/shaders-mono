import { Point, UnitVector, Vector } from '@shaders-mono/geopro';
import { TriangleData } from '../triangle-data';

const calculateNormal = (vx: number[], vertexId: number): UnitVector => {
  const p1 = Point.fromValues(vx[vertexId + 0], vx[vertexId + 1], vx[vertexId + 2]);
  const p2 = Point.fromValues(vx[vertexId + 3], vx[vertexId + 4], vx[vertexId + 5]);
  const p3 = Point.fromValues(vx[vertexId + 6], vx[vertexId + 7], vx[vertexId + 8]);

  const v1 = Vector.fromPoints(p2, p1);
  const v2 = Vector.fromPoints(p2, p3);

  return UnitVector.crossProduct(v1, v2);
};

export const cubeTriMesh = () => {
  const coordinates = [
    // Left -Y
    0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,

    0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5,

    //
    0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5,

    0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5,

    //
    -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5,

    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5,

    //
    -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,

    -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5,

    //
    0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5,

    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,

    // //
    0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5,

    0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
  ];
  const triangleData = new TriangleData(new Float32Array(coordinates), coordinates.length / 3);

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

  const normals = [];
  for (let tri = 0; tri < coordinates.length; tri += 9) {
    const normal = calculateNormal(coordinates, tri);
    normals.push(...normal.triplet);
    normals.push(...normal.triplet);
    normals.push(...normal.triplet);
  }
  triangleData.addNormals(new Float32Array(normals));

  return triangleData;
};
