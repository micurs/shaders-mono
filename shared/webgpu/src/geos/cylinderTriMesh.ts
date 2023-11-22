import { Point, UnitVector, Vector, Transform } from '@shaders-mono/geopro';
import { GeoRenderable } from '../geo-renderable';
import { GeoGenerator, GeoOptions } from '../types';

const disc = (step: number, z: number, facing: 'up' | 'down'): [Point[], UnitVector[]] => {
  const r = 0.5;
  const upVector = UnitVector.fromValues(0, 0, 1);
  const downVector = UnitVector.fromValues(0, 0, -1);
  const normals: UnitVector[] = [];
  const coordinates: Point[] = [];
  const alphaStart = facing === 'up' ? 0 : Math.PI * 2;
  const alphaStep = facing === 'up' ? Math.PI / step : -Math.PI / step;
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

const pipe = (step: number, bottom: number, top: number): [Point[], UnitVector[]] => {
  const r = 0.5;
  const coordinates: Point[] = [];
  const normals: UnitVector[] = [];
  const alphaStep = Math.PI / step;
  const centerBottomPt = Point.fromValues(0, 0, bottom);
  const centerTopPt = Point.fromValues(0, 0, top);

  for (let alpha = 0; alpha < Math.PI * 2; alpha += alphaStep) {
    const pt1 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), bottom);
    const nm1 = UnitVector.fromVector(Vector.fromPoints(pt1, centerBottomPt));
    coordinates.push(pt1);
    normals.push(nm1);

    const pt2 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), bottom);
    const nm2 = UnitVector.fromVector(Vector.fromPoints(pt2, centerBottomPt));
    coordinates.push(pt2);
    normals.push(nm2);

    const pt3 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), top);
    const nm3 = UnitVector.fromVector(Vector.fromPoints(pt3, centerTopPt));
    coordinates.push(pt3);
    normals.push(nm3);

    const pt4 = Point.fromValues(r * Math.cos(alpha), r * Math.sin(alpha), top);
    const nm4 = UnitVector.fromVector(Vector.fromPoints(pt4, centerTopPt));
    coordinates.push(pt4);
    normals.push(nm4);

    const pt5 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), bottom);
    const nm5 = UnitVector.fromVector(Vector.fromPoints(pt5, centerBottomPt));
    coordinates.push(pt5);
    normals.push(nm5);

    const pt6 = Point.fromValues(r * Math.cos(alpha + alphaStep), r * Math.sin(alpha + alphaStep), top);
    const nm6 = UnitVector.fromVector(Vector.fromPoints(pt6, centerTopPt));
    coordinates.push(pt6);
    normals.push(nm6);
  }
  return [coordinates, normals];
};

interface CylinderOptions {
  steps: number;
}

// type CylGenerator = <B>(p: Parameters<GeoGenerator<{}, CylinderOptions>>) => GeoRenderable<B>;
interface CylGenerator<B> extends GeoGenerator<B, CylinderOptions> {}
/**
 * Build a cylinder mesh
 * @param t
 * @param options
 * @returns
 */
export const cylinderGen: CylGenerator<any> = <B>(t: Transform, options: GeoOptions<CylinderOptions>): GeoRenderable<B> => {
  const { steps, colors, id, textureIndexes } = options;
  const coordinates = [];
  const normals = [];
  const textureUV: [number, number][] = [];

  const [discUpPts, n1] = disc(steps, 0.5, 'up');
  const [discDownPts, n2] = disc(steps, -0.5, 'down');
  const [pipePts, n3] = pipe(steps, -0.5, 0.5);
  coordinates.push(...discUpPts.map((v) => v.map(t)));
  coordinates.push(...discDownPts.map((v) => v.map(t)));
  coordinates.push(...pipePts.map((v) => v.map(t)));
  if (textureIndexes) {
    let last1U = 0;
    let last2U = 0;
    const t1: [number, number][] = discUpPts.map((p) => [p.x + 0.5, p.y + 0.5]);
    const t2: [number, number][] = discDownPts.map((p) => [p.x + 0.5, p.y + 0.5]);
    const t3: [number, number][] = pipePts.map((p) => {
      const v = p.z + 0.5;
      let u = (Math.atan2(p.y, p.x) + Math.PI) / (2 * Math.PI);
      if (u < Math.min(last1U, last2U)) {
        // make sure we don't wrap around the texture (this needs repeat mode)
        u += 1;
      }
      last2U = last1U;
      last1U = u;
      return [u, v];
    });
    textureUV.push(...t1);
    textureUV.push(...t2);
    textureUV.push(...t3);
  }
  normals.push(...n1);
  normals.push(...n2);
  normals.push(...n3);

  const triangleData = new GeoRenderable<B>(id, 'triangle-list', colors, textureIndexes);
  triangleData.addVertices(new Float32Array(coordinates.map((v) => v.triplet).flat()));
  triangleData.addNormals(new Float32Array(normals.map((v) => v.triplet).flat()));
  if (textureIndexes) {
    triangleData.addTextures(new Float32Array(textureUV.flat()));
  }
  return triangleData;
};

export const cylinderTriMesh = <B = null>(): CylGenerator<B> => cylinderGen;
