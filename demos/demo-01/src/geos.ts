import { TriangleData } from '@shaders-mono/webgpu';

export const buildCube = () => {
  const triangleData = new TriangleData(
    new Float32Array([
      // Left -Y
      1, -1, 1, -1, -1, 1, -1, -1, -1,

      1, -1, -1, 1, -1, 1, -1, -1, -1,

      //
      1, 1, 1, 1, -1, 1, 1, -1, -1,

      1, 1, -1, 1, 1, 1, 1, -1, -1,

      //
      -1, 1, 1, 1, 1, 1, 1, 1, -1,

      -1, 1, -1, -1, 1, 1, 1, 1, -1,

      //
      -1, -1, 1, -1, 1, 1, -1, 1, -1,

      -1, -1, -1, -1, -1, 1, -1, 1, -1,

      //
      1, 1, 1, -1, 1, 1, -1, -1, 1,

      -1, -1, 1, 1, -1, 1, 1, 1, 1,

      //
      1, -1, -1, -1, -1, -1, -1, 1, -1,

      1, 1, -1, 1, -1, -1, -1, 1, -1,
    ]),
    36
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

      //
      0, 1, 1, 1, 1, 0,

      0, 0, 0, 1, 1, 0,
    ])
  );

  return triangleData;
};
