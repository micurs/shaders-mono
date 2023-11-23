import { Frame, Point, Transform, UnitVector, deg2rad } from '@shaders-mono/geopro';
import { GeoRenderable } from '../geo-renderable';
import { createQuad, flatCoordinates } from './geo-utils';
import { GeoOptions, GeoGenerator } from '../types';

interface CubeGenerator<B> extends GeoGenerator<B, {}> {}

const cubeGen: CubeGenerator<any> = <B>(t: Transform, options: GeoOptions<{}>): GeoRenderable<B> => {
  const { id, textureCoordinates } = options;

  const rotationFront = Transform.rotationX(deg2rad(-90));
  const rotationDown = Transform.rotationX(deg2rad(180));
  const rotationBack = Transform.rotationX(deg2rad(90));
  const rotationLeft = Transform.rotationZ(deg2rad(-90)).rotationY(deg2rad(90));
  const rotationRight = Transform.rotationZ(deg2rad(+90)).rotationY(deg2rad(-90));

  const upFrame = Frame.from2Vectors(Point.fromValues(0, 0, 0.5), UnitVector.fromValues(0, 0, 1), UnitVector.fromValues(1, 0, 0));
  const downFrame = upFrame.map(rotationDown); //Frame.from2Vectors(Point.fromValues(0, 0, -0.5), UnitVector.fromValues(0, 0, -1), UnitVector.fromValues(-1, 0, 0));
  const frontFrame = upFrame.map(rotationFront);
  const backFrame = upFrame.map(rotationBack);
  const leftFrame = upFrame.map(rotationLeft);
  const rightFrame = upFrame.map(rotationRight);

  const size = { w: 0.25, h: 0.25 };

  const up = createQuad(upFrame, { w: 1, h: 1 }, { pos: { u: 0.25 + 0.25 / 2, v: 0.25 / 2 }, size });
  const down = createQuad(downFrame, { w: 1, h: 1 }, { pos: { u: 0.25 + 0.25 / 2, v: 0.5 + 0.25 / 2 }, size });
  const front = createQuad(frontFrame, { w: 1, h: 1 }, { pos: { u: 0.25 + 0.25 / 2, v: 0.25 + 0.25 / 2 }, size });
  const back = createQuad(backFrame, { w: 1, h: 1 }, { pos: { u: 0.75 + 0.25 / 2, v: 0.25 + 0.25 / 2 }, size });
  const left = createQuad(leftFrame, { w: 1, h: 1 }, { pos: { u: 0 + 0.25 / 2, v: 0.25 + 0.25 / 2 }, size });
  const right = createQuad(rightFrame, { w: 1, h: 1 }, { pos: { u: 0.5 + 0.25 / 2, v: 0.25 + 0.25 / 2 }, size });

  const [coordinates, normals, textureUV] = flatCoordinates(up, t);
  const downCoords = flatCoordinates(down, t);
  const frontCoords = flatCoordinates(front, t);
  const backCoords = flatCoordinates(back, t);
  const leftCoords = flatCoordinates(left, t);
  const rightCoords = flatCoordinates(right, t);
  coordinates.push(...downCoords[0], ...frontCoords[0], ...backCoords[0], ...leftCoords[0], ...rightCoords[0]);
  normals.push(...downCoords[1], ...frontCoords[1], ...backCoords[1], ...leftCoords[1], ...rightCoords[1]);
  textureUV.push(...downCoords[2], ...frontCoords[2], ...backCoords[2], ...leftCoords[2], ...rightCoords[2]);

  const triangleData = new GeoRenderable<B>(id, 'triangle-list', options);
  triangleData.addVertices(new Float32Array(coordinates));
  triangleData.addNormals(new Float32Array(normals));

  if (textureCoordinates) {
    triangleData.addTextures(new Float32Array(textureUV));
  }

  return triangleData;
};

export const cubeTriMesh = <B = null>(): CubeGenerator<B> => cubeGen;
