import { UnitVector, Point, Vector, Frame, Transform } from '@shaders-mono/geopro';
import { Dimension, TextureCoordinate, TextureWindow } from '../types';

export const calculateNormalForwardTri = (pts: Point[], vertexId: number): UnitVector => {
  const p0 = pts[vertexId + 0]; // Point.fromValues(pts[vertexId + 0], pts[vertexId + 1], vx[vertexId + 2]);
  const p1 = pts[vertexId + 1]; // Point.fromValues(pts[vertexId + 3], pts[vertexId + 4], vx[vertexId + 5]);
  const p2 = pts[vertexId + 2]; // Point.fromValues(pts[vertexId + 6], pts[vertexId + 7], vx[vertexId + 8]);

  const v1 = Vector.fromPoints(p1, p0);
  const v2 = Vector.fromPoints(p2, p0);

  return UnitVector.crossProduct(v1, v2);
};

export const calculateNormalsBackwardTri = (pts: Point[], vertexId: number): UnitVector => {
  const p1 = pts[vertexId - 2]; // Point.fromValues(vx[vertexId - 6], vx[vertexId - 5], vx[vertexId - 4]);
  const p2 = pts[vertexId - 1]; //Point.fromValues(vx[vertexId - 3], vx[vertexId - 2], vx[vertexId - 1]);
  const p3 = pts[vertexId - 0]; //Point.fromValues(vx[vertexId + 0], vx[vertexId + 1], vx[vertexId + 2]);

  const v1 = Vector.fromPoints(p2, p1);
  const v2 = Vector.fromPoints(p2, p3);

  return UnitVector.crossProduct(v2, v1);
};

export const computeNormals = (topology: GPUPrimitiveTopology, coordinates: Point[]): UnitVector[] => {
  const normals: UnitVector[] = [];
  const triStep = topology === 'triangle-list' ? 3 : 1;

  if (topology === 'triangle-strip') {
    let normal = calculateNormalForwardTri(coordinates, 0);
    normals.push(normal);
    normals.push(normal);

    for (let tri = 1; tri < coordinates.length; tri += 1) {
      calculateNormalsBackwardTri(coordinates, tri);
      normals.push(normal);
    }
  } else {
    for (let tri = 0; tri < coordinates.length - 2; tri += triStep) {
      const normal = calculateNormalForwardTri(coordinates, tri);
      normals.push(normal);
      normals.push(normal);
      normals.push(normal);
    }
  }
  return normals;
};

/**
 * Create a quad with the given position, size and texture coordinates
 * @param position - as a Frame indicating the origin of the quad and its orientation
 * @param size - the size of the quad in world units
 * @param texturePos - the position of the quad in texture space.
 * @returns
 */
export const createQuad = (position: Frame, size: Dimension, texturePos: TextureWindow): [Point[], UnitVector[], TextureCoordinate[]] => {
  const { w, h } = size;
  const sw = w / 2;
  const sh = h / 2;
  const o = position.origin;

  const vertices: Point[] = [];
  const normals: UnitVector[] = [];

  const normalsUp = UnitVector.fromValues(0, 0, 1);

  vertices.push(Point.fromValues(o.x - sw, o.y - sh, 0));
  vertices.push(Point.fromValues(o.x + sw, o.y - sh, 0));
  vertices.push(Point.fromValues(o.x - sw, o.y + sh, 0));

  vertices.push(Point.fromValues(o.x - sw, o.y + sh, 0));
  vertices.push(Point.fromValues(o.x + sw, o.y - sh, 0));
  vertices.push(Point.fromValues(o.x + sw, o.y + sh, 0));

  normals.push(normalsUp, normalsUp, normalsUp, normalsUp, normalsUp, normalsUp);

  const textures: TextureCoordinate[] = [];
  const { pos: tp, size: ts } = texturePos;
  const { w: tw, h: th } = ts;
  const stw = tw / 2;
  const sth = th / 2;
  textures.push({ u: tp.u + stw, v: tp.v - sth });
  textures.push({ u: tp.u - stw, v: tp.v - sth });
  textures.push({ u: tp.u + stw, v: tp.v + sth });

  textures.push({ u: tp.u + stw, v: tp.v + sth });
  textures.push({ u: tp.u - stw, v: tp.v - sth });
  textures.push({ u: tp.u - stw, v: tp.v + sth });

  // All these points and vectors are relative to the position frame.
  // Let's transform them to absolute coordinates system before returning them.

  const tVertices = vertices.map((v) => v.absolute(position));
  const tNormals = normals.map((n) => n.absolute(position));

  return [tVertices, tNormals, textures];
};

export const flatCoordinates = (c: [Point[], UnitVector[], TextureCoordinate[]], t: Transform): [number[], number[], number[]] => {
  return [
    c[0].map((p) => p.map(t).triplet).flat(), // vertices
    c[1].map((p) => p.map(t).triplet).flat(), // normals
    c[2].map((p) => [p.u, p.v]).flat(), // textureUV
  ];
};
