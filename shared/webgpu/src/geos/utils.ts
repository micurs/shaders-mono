import { UnitVector, Point, Vector } from '@shaders-mono/geopro';

export const calculateNormalForwardTri = (vx: number[], vertexId: number): UnitVector => {
  const p1 = Point.fromValues(vx[vertexId + 0], vx[vertexId + 1], vx[vertexId + 2]);
  const p2 = Point.fromValues(vx[vertexId + 3], vx[vertexId + 4], vx[vertexId + 5]);
  const p3 = Point.fromValues(vx[vertexId + 6], vx[vertexId + 7], vx[vertexId + 8]);

  const v1 = Vector.fromPoints(p2, p1);
  const v2 = Vector.fromPoints(p2, p3);

  return UnitVector.crossProduct(v1, v2);
};

export const calculateNormalsBackwardTri = (vx: number[], vertexId: number): UnitVector => {
  const p1 = Point.fromValues(vx[vertexId - 6], vx[vertexId - 5], vx[vertexId - 4]);
  const p2 = Point.fromValues(vx[vertexId - 3], vx[vertexId - 2], vx[vertexId - 1]);
  const p3 = Point.fromValues(vx[vertexId + 0], vx[vertexId + 1], vx[vertexId + 2]);

  const v1 = Vector.fromPoints(p2, p1);
  const v2 = Vector.fromPoints(p2, p3);

  return UnitVector.crossProduct(v1, v2);
};

export const computeNormals = (topology: GPUPrimitiveTopology, coordinates: number[]) => {
  const normals = [];
  const triStep = topology === 'triangle-list' ? 3 * 3 : 1 * 3;

  if (topology === 'triangle-strip') {
    let normal = calculateNormalForwardTri(coordinates, 0);
    normals.push(...normal.triplet);
    normals.push(...normal.triplet);

    for (let tri = 3; tri < coordinates.length; tri += triStep) {
      calculateNormalsBackwardTri(coordinates, tri);
      normals.push(...normal.triplet);
    }
  } else {
    for (let tri = 0; tri < coordinates.length; tri += triStep) {
      const normal = calculateNormalForwardTri(coordinates, tri);
      normals.push(...normal.triplet);
      normals.push(...normal.triplet);
      normals.push(...normal.triplet);
    }
  }
  return normals;
};
