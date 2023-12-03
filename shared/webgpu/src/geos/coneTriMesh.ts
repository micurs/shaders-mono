import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { GeoRenderable } from '../geo-renderable';
import { GeoGenerator, GeoOptions } from '../types';
import { cone, cylMapToTextureCoordinates, disc, rolloverEdgeCoordinates } from './geo-utils';

interface ConeOptions {
  steps: number;
  height: number;
}

interface ConeGenerator<B> extends GeoGenerator<B, ConeOptions> {}

const coneGen: ConeGenerator<any> = <B>(t: Transform, options: GeoOptions<ConeOptions>): GeoRenderable<B> => {
  const { steps, id, height, textureCoordinates } = options;
  const nt = t.transpose().invert();
  let coordinates: Point[] = [];
  const normals: UnitVector[] = [];
  const textureUV: [number, number][] = [];

  const alpha = Math.atan(1 / 0.5);
  // const beta = Math.PI / 2 - alpha;

  const hCut = 1 - Math.min(1.0, height);
  const upBaseRadius = (hCut / Math.sin(alpha)) * Math.cos(alpha);

  const [basePts, baseNormals] = disc(steps, -0.5, 'down');
  const [sidePts, sideNormals] = cone(steps, -0.5, height);
  const [topPts, topNormals] = disc(steps, -0.5 + height, 'up', upBaseRadius);

  coordinates.push(...topPts);
  coordinates.push(...basePts);
  coordinates.push(...sidePts);
  if (textureCoordinates) {
    textureUV.push(...topPts.map<[number, number]>((p) => [p.x + 0.5, p.y + 0.5]));
    textureUV.push(...basePts.map<[number, number]>((p) => [p.x + 0.5, p.y + 0.5]));
    const triCount = sidePts.length / 3;
    for (let triIdx = 0; triIdx < triCount; triIdx++) {
      const t0 = cylMapToTextureCoordinates(sidePts[triIdx * 3 + 0]);
      const t1 = cylMapToTextureCoordinates(sidePts[triIdx * 3 + 1]);
      const t2 = cylMapToTextureCoordinates(sidePts[triIdx * 3 + 2]);
      rolloverEdgeCoordinates(t0, t1, t2);
      textureUV.push(t0);
      textureUV.push(t1);
      textureUV.push(t2);
    }
  }
  coordinates = coordinates.map((v) => v.map(t));
  normals.push(...topNormals.map((v) => v.map(nt)));
  normals.push(...baseNormals.map((v) => v.map(nt)));
  normals.push(...sideNormals.map((v) => v.map(nt)));

  const triangleData = new GeoRenderable<B>(id, 'triangle-list', options);
  triangleData.addVertices(new Float32Array(coordinates.map((v) => v.triplet).flat()));
  triangleData.addNormals(new Float32Array(normals.map((v) => v.triplet).flat()));
  if (textureCoordinates) {
    triangleData.addTextures(new Float32Array(textureUV.flat()));
  }
  return triangleData;
};

export const coneTriMesh = <B = null>(): ConeGenerator<B> => coneGen;
