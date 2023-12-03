import { Transform } from '@shaders-mono/geopro';
import { GeoRenderable } from '../geo-renderable';
import { GeoGenerator, GeoOptions } from '../types';
import { disc, pipe } from './geo-utils';

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
  const { steps, id, textureCoordinates } = options;
  const nt = t.transpose().invert();

  const coordinates = [];
  const normals = [];
  const textureUV: [number, number][] = [];

  const [discUpPts, n1] = disc(steps, 0.5, 'up');
  const [discDownPts, n2] = disc(steps, -0.5, 'down');
  const [pipePts, n3] = pipe(steps, -0.5, 0.5);
  coordinates.push(...discUpPts.map((v) => v.map(t)));
  coordinates.push(...discDownPts.map((v) => v.map(t)));
  coordinates.push(...pipePts.map((v) => v.map(t)));
  if (textureCoordinates) {
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
  normals.push(...n1.map((v) => v.map(nt)));
  normals.push(...n2.map((v) => v.map(nt)));
  normals.push(...n3.map((v) => v.map(nt)));

  const triangleData = new GeoRenderable<B>(id, 'triangle-list', options);
  triangleData.addVertices(new Float32Array(coordinates.map((v) => v.triplet).flat()));
  triangleData.addNormals(new Float32Array(normals.map((v) => v.triplet).flat()));
  if (textureCoordinates) {
    triangleData.addTextures(new Float32Array(textureUV.flat()));
  }
  return triangleData;
};

export const cylinderTriMesh = <B = null>(): CylGenerator<B> => cylinderGen;
