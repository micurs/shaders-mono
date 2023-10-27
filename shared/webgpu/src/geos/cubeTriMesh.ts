import { TriangleData } from '../triangle-data';
import { computeNormals } from './utils';

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
  const triangleData = new TriangleData(
    new Float32Array(coordinates),
    coordinates.length / 3
  );

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

  const normals = computeNormals(coordinates);
  triangleData.addNormals(new Float32Array(normals));

  return triangleData;
};
