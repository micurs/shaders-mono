import { TriangleData } from '../triangle-data';
import { computeNormals } from './utils';

const disc = (step: number, z: number, facing: 'up' | 'down'): number[] => {
  const coordinates = [];
  const alphaStart = facing === 'up' ? 0 : Math.PI * 2;
  const alphaStep = facing === 'up' ? Math.PI / step : -Math.PI / step;
  const pred =
    facing === 'up'
      ? (alpha: number) => alpha < Math.PI * 2
      : (alpha: number) => alpha > 0;
  for (let alpha = alphaStart; pred(alpha); alpha += alphaStep) {
    coordinates.push(0, 0, z);
    coordinates.push(Math.cos(alpha), Math.sin(alpha), z);
    coordinates.push(
      Math.cos(alpha + alphaStep),
      Math.sin(alpha + alphaStep),
      z
    );
  }
  return coordinates;
};

const pipe = (step: number, bottom: number, top: number): number[] => {
  const coordinates = [];
  const alphaStep = Math.PI / step;
  for (let alpha = 0; alpha < Math.PI * 2; alpha += alphaStep) {
    coordinates.push(Math.cos(alpha), Math.sin(alpha), bottom);
    coordinates.push(
      Math.cos(alpha + alphaStep),
      Math.sin(alpha + alphaStep),
      bottom
    );
    coordinates.push(Math.cos(alpha), Math.sin(alpha), top);

    coordinates.push(Math.cos(alpha), Math.sin(alpha), top);
    coordinates.push(
      Math.cos(alpha + alphaStep),
      Math.sin(alpha + alphaStep),
      bottom
    );
    coordinates.push(
      Math.cos(alpha + alphaStep),
      Math.sin(alpha + alphaStep),
      top
    );
  }
  return coordinates;
};

export const cylinderTriMesh = () => {
  const coordinates = [];
  coordinates.push(...disc(8, 0.5, 'up'));
  coordinates.push(...disc(8, -0.5, 'down'));
  coordinates.push(...pipe(8, -0.5, 0.5));

  const triangleData = new TriangleData(
    new Float32Array(coordinates),
    coordinates.length / 3
  );
  const normals = computeNormals(coordinates);
  triangleData.addNormals(new Float32Array(normals));

  return triangleData;
};
