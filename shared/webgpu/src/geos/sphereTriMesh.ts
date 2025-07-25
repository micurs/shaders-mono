// Constants for the icosahedron generation

import { UnitVector, Vector } from '@shaders-mono/geopro';
import { GeoRenderable } from '../geo-renderable';
import { GeoOptions, GeoGenerator } from '../types';
import { Transform } from '@shaders-mono/geopro';
import { Point } from '@shaders-mono/geopro';
import { rolloverEdgeCoordinates, sphereMapToTextureCoordinates } from './geo-utils';

type TriangleIndexes = [number, number, number];

//  Base Icosahedron:
// -------------------------------------------------------------------
// Define the vertices of an icosahedron. The vertices of an icosahedron
// can be defined using intersections of three orthogonal rectangles,
// or by intersecting five planes with a sphere.
const X = 0.5257311121191336;
const Z = 0.8506508083520399;

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

interface SphereOptions {
  steps: number;
}

interface SphereGenerator<B> extends GeoGenerator<B, SphereOptions> {}

/**
 * Build a sphere mesh
 * @param t
 * @param options
 * @returns
 */
export const sphereGen: SphereGenerator<any> = <B>(t: Transform, options: GeoOptions<SphereOptions>): GeoRenderable<B> => {
  const { steps, id, textureCoordinates } = options;
  const nt = t.transpose().invert();
  const upVector = UnitVector.fromValues(0, 0, 1);
  const [sphVertices, sphIndexes] = subdivide(vertices, indices, steps);

  // console.log(' Number of vertices', vertices.length);

  const coordinates: number[] = [];
  const normals: number[] = [];
  const tangents: number[] = [];
  const textureUV: number[] = [];
  const center = Point.fromValues(0, 0, 0); //.map(t);
  sphIndexes.forEach((triangle) => {
    const pt0 = Point.fromVector(sphVertices[triangle[2]]);
    const pt1 = Point.fromVector(sphVertices[triangle[1]]);
    const pt2 = Point.fromVector(sphVertices[triangle[0]]);
    const n0 = UnitVector.fromVector(Vector.fromPoints(pt0, center));
    const n1 = UnitVector.fromVector(Vector.fromPoints(pt1, center));
    const n2 = UnitVector.fromVector(Vector.fromPoints(pt2, center));
    coordinates.push(...pt0.map(t).triplet);
    coordinates.push(...pt1.map(t).triplet);
    coordinates.push(...pt2.map(t).triplet);
    normals.push(...n0.map(nt).triplet);
    normals.push(...n1.map(nt).triplet);
    normals.push(...n2.map(nt).triplet);
    tangents.push(...UnitVector.fromVector(n0.crossProduct(upVector)).triplet);
    tangents.push(...UnitVector.fromVector(n1.crossProduct(upVector)).triplet);
    tangents.push(...UnitVector.fromVector(n2.crossProduct(upVector)).triplet);
    if (textureCoordinates) {
      const t0 = sphereMapToTextureCoordinates(n0);
      const t1 = sphereMapToTextureCoordinates(n1);
      const t2 = sphereMapToTextureCoordinates(n2);
      rolloverEdgeCoordinates(t0, t1, t2);
      textureUV.push(...t0);
      textureUV.push(...t1);
      textureUV.push(...t2);
    }
  });
  const triangleData = new GeoRenderable<B>(id, 'triangle-list', options);
  triangleData.addVertices(new Float32Array(coordinates));
  triangleData.addNormals(new Float32Array(normals));
  triangleData.addTangents(new Float32Array(tangents));
  if (textureCoordinates) {
    triangleData.addTextures(new Float32Array(textureUV));
  }
  return triangleData;
};

export const sphereTriMesh = <B = null>(): SphereGenerator<B> => sphereGen;


