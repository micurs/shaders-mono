// Constants for the icosahedron generation

import { Point, UnitVector, Vector } from '@shaders-mono/geopro';
import { TriangleData } from '../triangle-data';
import { RGBAColor } from '../types';
import { computeNormals } from './utils';

type TriangleIndexes = [number, number, number];

//  Base Icosahedron:
// -------------------------------------------------------------------
// Define the vertices of an icosahedron. The vertices of an icosahedron
// can be defined using intersections of three orthogonal rectangles,
// or by intersecting five planes with a sphere.
const X = 0.525731112119133606;
const Z = 0.850650808352039932;

// Initial vertices of the Icosahedron
const vertices: UnitVector[] = [
  UnitVector.fromValues(-X, 0.0, Z),
  UnitVector.fromValues(X, 0.0, Z),
  UnitVector.fromValues(-X, 0.0, -Z),
  UnitVector.fromValues(X, 0.0, -Z),
  UnitVector.fromValues(0.0, Z, X),
  UnitVector.fromValues(0.0, Z, -X),
  UnitVector.fromValues(0.0, -Z, X),
  UnitVector.fromValues(0.0, -Z, -X),
  UnitVector.fromValues(Z, X, 0.0),
  UnitVector.fromValues(-Z, X, 0.0),
  UnitVector.fromValues(Z, -X, 0.0),
  UnitVector.fromValues(-Z, -X, 0.0),
];

// indices of the vertices of the triangles that form the icosahedron
const indices: TriangleIndexes[] = [
  [0, 4, 1],
  [0, 9, 4],
  [9, 5, 4],
  [4, 5, 8],
  [4, 8, 1],
  [8, 10, 1],
  [8, 3, 10],
  [5, 3, 8],
  [5, 2, 3],
  [2, 7, 3],
  [7, 10, 3],
  [7, 6, 10],
  [7, 11, 6],
  [11, 0, 6],
  [0, 1, 6],
  [6, 1, 10],
  [9, 0, 11],
  [9, 11, 2],
  [9, 2, 5],
  [7, 2, 11],
];

// function normalize(v: Point): Point {
//   const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
//   return [v[0] / length, v[1] / length, v[2] / length];
// }

function midpoint(v1: Vector, v2: Vector): UnitVector {
  return UnitVector.fromVector(v1.add(v2));
}

function subdivide(vertices: UnitVector[], triangles: TriangleIndexes[], depth: number = 1): [UnitVector[], TriangleIndexes[]] {
  const midpoints: Map<string, number> = new Map();
  const newTriangles: TriangleIndexes[] = [];

  function getMidpointIndex(p1: number, p2: number): number {
    const firstIsSmaller = p1 < p2;
    const smallerIndex = firstIsSmaller ? p1 : p2;
    const greaterIndex = firstIsSmaller ? p2 : p1;
    const key = `${smallerIndex}-${greaterIndex}`;

    const index = midpoints.get(key);
    if (index) return index;

    const midDir = midpoint(Vector.fromValues(...vertices[p1].triplet), Vector.fromValues(...vertices[p2].triplet));
    vertices.push(midDir);
    const newIndex = vertices.length - 1;
    midpoints.set(key, newIndex);

    return newIndex;
  }

  for (const [a, b, c] of triangles) {
    const ab = getMidpointIndex(a, b);
    const ac = getMidpointIndex(a, c);
    const bc = getMidpointIndex(b, c);

    newTriangles.push([a, ab, ac]);
    newTriangles.push([b, bc, ab]);
    newTriangles.push([c, ac, bc]);
    newTriangles.push([ab, bc, ac]);
  }

  if (depth === 1) {
    return [vertices, newTriangles];
  } else {
    return subdivide(vertices, newTriangles, depth - 1);
  }
}

export const sphereTriMesh = (steps: number, color: RGBAColor) => {
  const [sphVertices, sphIndexes] = subdivide(vertices, indices, steps);

  console.log(' Number of vertices', vertices.length);

  const coordinates: number[] = [];
  const normals: number[] = [];
  sphIndexes.forEach((triangle) => {
    console.log(triangle);
    console.log(sphVertices[triangle[0]]);
    coordinates.push(...sphVertices[triangle[2]].triplet);
    coordinates.push(...sphVertices[triangle[1]].triplet);
    coordinates.push(...sphVertices[triangle[0]].triplet);
    normals.push(...sphVertices[triangle[2]].invert().triplet);
    normals.push(...sphVertices[triangle[1]].invert().triplet);
    normals.push(...sphVertices[triangle[0]].invert().triplet);
  });
  const triangleData = new TriangleData(new Float32Array(coordinates), coordinates.length / 3, color);
  triangleData.addNormals(new Float32Array(normals));
  return triangleData;
};