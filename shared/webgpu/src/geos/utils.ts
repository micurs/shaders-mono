import { UnitVector, Point, Vector } from '@shaders-mono/geopro';

export const calculateNormal = (vx: number[], vertexId: number): UnitVector => {
  const p1 = Point.fromValues(
    vx[vertexId + 0],
    vx[vertexId + 1],
    vx[vertexId + 2]
  );
  const p2 = Point.fromValues(
    vx[vertexId + 3],
    vx[vertexId + 4],
    vx[vertexId + 5]
  );
  const p3 = Point.fromValues(
    vx[vertexId + 6],
    vx[vertexId + 7],
    vx[vertexId + 8]
  );

  const v1 = Vector.fromPoints(p2, p1);
  const v2 = Vector.fromPoints(p2, p3);

  return UnitVector.crossProduct(v1, v2);
};

export const computeNormals = (coordinates: number[]) => {
  const normals = [];
  for (let tri = 0; tri < coordinates.length; tri += 9) {
    const normal = calculateNormal(coordinates, tri);
    normals.push(...normal.triplet);
    normals.push(...normal.triplet);
    normals.push(...normal.triplet);
  }
  return normals;
};
