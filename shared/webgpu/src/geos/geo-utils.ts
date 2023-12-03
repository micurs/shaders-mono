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

    for (let tri = 2; tri < coordinates.length; tri += 1) {
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
  const nt = t.transpose().invert();
  return [
    c[0].map((p) => p.map(t).triplet).flat(), // vertices
    c[1].map((p) => p.map(nt).triplet).flat(), // normals
    c[2].map((p) => [p.u, p.v]).flat(), // textureUV
  ];
};

export const cone = (step: number, z: number, h: number = 1.0): [Point[], UnitVector[]] => {
  const r = 0.5;
  const coordinates: Point[] = [];
  const alphaStart = 0;
  const spanAngle = Math.PI * 2;
  const alphaStep = spanAngle / step;
  const normals: UnitVector[] = [];

  const alpha = Math.atan(1 / 0.5);
  const beta = Math.PI / 2 - alpha;
  const normalZ = Math.sin(beta); // Z component of the normal vector
  const upZ = -0.5 + h;
  if (h >= 1.0) {
    for (let ang = alphaStart; ang < spanAngle; ang += alphaStep) {
      const pt0 = Point.fromValues(0, 0, -z);
      const pt1 = Point.fromValues(r * Math.cos(ang), r * Math.sin(ang), z);
      const pt2 = Point.fromValues(r * Math.cos(ang + alphaStep), r * Math.sin(ang + alphaStep), z);
      coordinates.push(pt0);
      coordinates.push(pt1);
      coordinates.push(pt2);
      const normP1 = UnitVector.fromValues(Math.cos(ang), Math.sin(ang), normalZ);
      const normP2 = UnitVector.fromValues(Math.cos(ang + alphaStep), Math.sin(ang + alphaStep), normalZ);
      const normP0 = normP1; // UnitVector.fromVector(normP1.add(normP2));
      normals.push(normP0, normP1, normP2);
    }
  } else {
    const upR = ((1 - h) / Math.sin(alpha)) * Math.cos(alpha);
    for (let ang = alphaStart; ang < spanAngle; ang += alphaStep) {
      const pt0 = Point.fromValues(upR * Math.cos(ang), upR * Math.sin(ang), upZ);
      const pt1 = Point.fromValues(r * Math.cos(ang), r * Math.sin(ang), z);
      const pt2 = Point.fromValues(r * Math.cos(ang + alphaStep), r * Math.sin(ang + alphaStep), z);
      const pt3 = Point.fromValues(upR * Math.cos(ang + alphaStep), upR * Math.sin(ang + alphaStep), upZ);
      const normP1 = UnitVector.fromValues(Math.cos(ang), Math.sin(ang), normalZ);
      const normP2 = UnitVector.fromValues(Math.cos(ang + alphaStep), Math.sin(ang + alphaStep), normalZ);

      coordinates.push(pt0);
      coordinates.push(pt1);
      coordinates.push(pt2);
      normals.push(normP1, normP1, normP2);

      coordinates.push(pt2);
      coordinates.push(pt3);
      coordinates.push(pt0);
      normals.push(normP2, normP2, normP1);
    }
  }
  // const normals: UnitVector[] = computeNormals('triangle-list', coordinates);
  return [coordinates, normals];
};

export const disc = (step: number, z: number, facing: 'up' | 'down', radius: number = 0.5): [Point[], UnitVector[]] => {
  const r = radius;
  const upVector = UnitVector.fromValues(0, 0, 1);
  const downVector = UnitVector.fromValues(0, 0, -1);
  const normals: UnitVector[] = [];
  const coordinates: Point[] = [];
  const alphaStart = facing === 'up' ? 0 : Math.PI * 2;
  const alphaStep = facing === 'up' ? (Math.PI * 2) / step : (-Math.PI * 2) / step;
  const pred = facing === 'up' ? (alpha: number) => alpha < Math.PI * 2 : (alpha: number) => alpha > 0;
  for (let alpha = alphaStart; pred(alpha); alpha += alphaStep) {
    const pt0 = Point.fromValues(0, 0, z);
    const pt1 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), z);
    const pt2 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), z);
    coordinates.push(pt0);
    coordinates.push(pt1);
    coordinates.push(pt2);
    if (facing === 'up') {
      normals.push(upVector, upVector, upVector);
    } else {
      normals.push(downVector, downVector, downVector);
    }
  }
  // return [coordinates, computeNormals('triangle-list', coordinates)];
  return [coordinates, normals];
};

export const pipe = (step: number, bottom: number, top: number): [Point[], UnitVector[]] => {
  const r = 0.5;
  const coordinates: Point[] = [];
  const normals: UnitVector[] = [];
  const alphaStep = Math.PI / step;
  const centerBottomPt = Point.fromValues(0, 0, bottom);
  const centerTopPt = Point.fromValues(0, 0, top);

  for (let alpha = 0; alpha < Math.PI * 2; alpha += alphaStep) {
    const pt1 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), bottom);
    const nm1 = UnitVector.fromPoints(pt1, centerBottomPt);
    coordinates.push(pt1);
    normals.push(nm1);

    const pt2 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), bottom);
    const nm2 = UnitVector.fromPoints(pt2, centerBottomPt);
    coordinates.push(pt2);
    normals.push(nm2);

    const pt3 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), top);
    const nm3 = UnitVector.fromPoints(pt3, centerTopPt);
    coordinates.push(pt3);
    normals.push(nm3);

    const pt4 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), top);
    const nm4 = UnitVector.fromPoints(pt4, centerTopPt);
    coordinates.push(pt4);
    normals.push(nm4);

    const pt5 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), bottom);
    const nm5 = UnitVector.fromPoints(pt5, centerBottomPt);
    coordinates.push(pt5);
    normals.push(nm5);

    const pt6 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), top);
    const nm6 = UnitVector.fromPoints(pt6, centerTopPt);
    coordinates.push(pt6);
    normals.push(nm6);
  }
  return [coordinates, normals];
};


/**
 * Map a point on a 0 centered sphere to a texture coordinate
 * @param v
 */
export const sphereMapToTextureCoordinates = (v: UnitVector): [number, number] => {
  let latitude = Math.asin(v.z);
  let longitude = Math.atan2(v.y, v.x) + Math.PI;

  // Normalize the result to 0..1 range
  return [longitude / (2 * Math.PI), 0.5 - latitude / Math.PI];
};

export const cylMapToTextureCoordinates = (p: Point): [number, number] => {
  return [
    (Math.atan2(p.y, p.x) + Math.PI) / (2 * Math.PI),
    (p.z + 0.5),
  ];
}

export const  rolloverEdgeCoordinates = (t0: [number, number], t1: [number, number], t2: [number, number]) => {
  const minT = Math.min(t0[0], t1[0], t2[0]);
  const maxT = Math.max(t0[0], t1[0], t2[0]);
  // "shifting" the U coordinate of the vertex that is on the opposite side of the
  // seam by subtracting or adding 1 to it. This makes sure that all vertices of a
  // triangle are consistently mapped, and the texture will not stretch across
  // the sphere's surface.
  if (Math.abs(maxT - minT) > 0.8) {
    if (t0[0] < 0.4 && t1[0] < 0.4) {
      t2[0] -= 1;
    } else if (t0[0] < 0.4 && t2[0] < 0.4) {
      t1[0] -= 1;
    } else if (t1[0] < 0.4 && t2[0] < 0.4) {
      t0[0] -= 1;
    } else if (t0[0] > 0.6 && t1[0] > 0.6) {
      t2[0] += 1;
    } else if (t0[0] > 0.6 && t2[0] > 0.6) {
      t1[0] += 1;
    } else if (t1[0] > 0.6 && t2[0] > 0.6) {
      t0[0] += 1;
    }
  }
}
