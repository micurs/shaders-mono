import { Point, Transform, Vector } from '@shaders-mono/geopro';
import { GeoOptions, GeoGenerator, RGBAColor } from '../types';
import { GeoRenderable } from '../geo-renderable';

interface GridOptions {
  showAxes?: boolean;
}

interface PlaneGenerator<B> extends GeoGenerator<B, GridOptions> {}

export const planeGridGenerator: PlaneGenerator<any> = <B = null>(t: Transform, options: GeoOptions<GridOptions>): GeoRenderable<B> => {
  const { id } = options;

  // 0 - Determine the scale of the plane (x/y)
  const s = t.scaleVector;
  const targetAlpha = options.colors?.[0] ? options.colors[0][3] / 2 : 0.8;
  const minDim = Math.min(s.x, s.y);

  const base10 = Math.log10(minDim);
  const mainAlpha = Math.max(0.9 - (base10 - Math.floor(base10)), targetAlpha / 2);
  const nextAlpha = Math.max(Math.min(0.9, mainAlpha * 2.0), targetAlpha);
  const prevAlpha = options.colors?.[0] ? options.colors[0][3] / 2 : mainAlpha * 0.5;
  const prevExpStep = Math.floor(base10) - 2;
  const mainExpStep = Math.floor(base10) - 1;
  const nextExpStep = Math.floor(base10);
  const mainTileDim = Math.pow(10, Math.round(mainExpStep));
  const nextTileDim = Math.pow(10, Math.round(nextExpStep)) / 2;
  const prevTileDim = Math.pow(10, Math.round(prevExpStep));

  console.log('prev tileDim', prevTileDim, 'with total grids', minDim / prevTileDim, ' with alpha', prevAlpha);
  console.log('main tileDim', mainTileDim, 'with total grids', minDim / mainTileDim, ' with alpha', mainAlpha);
  console.log('next tileDim', nextTileDim, 'with total grids', minDim / nextTileDim, ' with alpha', nextAlpha);

  // X lines
  const mainGridPts = generateGridPoints(s, mainTileDim, t);
  const nextGridPts = generateGridPoints(s, nextTileDim, t);

  // Create the GeoRenderable using 'line-list' as topology.
  const geo = new GeoRenderable<B>(id, 'line-list', options);

  if (options.showAxes) {
    const axes: Point[] = [];
    const xAxes0 = Point.fromValues(-0.5, 0, 0).map(t);
    const xAxes1 = Point.fromValues(+0.5, 0, 0).map(t);
    const yAxes0 = Point.fromValues(0, -0.5, 0).map(t);
    const yAxes1 = Point.fromValues(0, +0.5, 0).map(t);
    const zAxes0 = Point.fromValues(0, 0, 0).map(t);
    const zAxes1 = Point.fromValues(0, 0, mainTileDim);
    axes.push(xAxes0, xAxes1, yAxes0, yAxes1, zAxes0, zAxes1);
    const axesColors = [
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
      [0.1, 0.1, 1, 1],
      [0.1, 0.1, 1, 1],
    ];
    geo.addVertices(new Float32Array(axes.flatMap((p) => p.triplet)));
    geo.addColors(new Float32Array(axesColors.flat()));
  }

  geo.addVertices(new Float32Array(nextGridPts.flatMap((p) => p.triplet)));
  geo.addColors(new Float32Array(generateVertexColors(nextGridPts, nextAlpha)));

  geo.addVertices(new Float32Array(mainGridPts.flatMap((p) => p.triplet)));
  geo.addColors(new Float32Array(generateVertexColors(mainGridPts, mainAlpha, options.colors?.[0])));

  if (minDim / prevTileDim < 100) {
    const prevGridPts = generateGridPoints(s, prevTileDim, t);
    geo.addVertices(new Float32Array(prevGridPts.flatMap((p) => p.triplet)));
    geo.addColors(new Float32Array(generateVertexColors(prevGridPts, prevAlpha, options.colors?.[0])));
  }
  return geo;
};

export const planeGridLines = <B = null>(): PlaneGenerator<B> => planeGridGenerator;

const generateGridPoints = (s: Vector, tileDim: number, t: Transform) => {
  const nextNx = s.x / tileDim;
  const nextNy = s.y / tileDim;
  const stepX = 1.0 / nextNx;
  const stepY = 1.0 / nextNy;

  const pts: Point[] = [];
  for (let xCol = 0; xCol < nextNx / 2; xCol++) {
    const ptStart0 = Point.fromValues(-stepX * xCol, -0.5, 0).map(t);
    const ptEnd0 = Point.fromValues(-stepX * xCol, +0.5, 0).map(t);
    pts.push(ptStart0, ptEnd0);

    if (stepX * (xCol + 1) < 0.5) {
      const ptStart1 = Point.fromValues(stepX * (xCol + 1), -0.5, 0).map(t);
      const ptEnd1 = Point.fromValues(stepX * (xCol + 1), +0.5, 0).map(t);
      pts.push(ptStart1, ptEnd1);
    }
  }
  for (let yRow = 0; yRow < nextNy / 2; yRow++) {
    const ptStart0 = Point.fromValues(-0.5, -stepY * yRow, 0).map(t);
    const ptEnd0 = Point.fromValues(+0.5, -stepY * yRow, 0).map(t);
    pts.push(ptStart0, ptEnd0);

    if (stepY * (yRow + 1) < 0.5) {
      const ptStart1 = Point.fromValues(-0.5, stepY * (yRow + 1), 0).map(t);
      const ptEnd1 = Point.fromValues(+0.5, stepY * (yRow + 1), 0).map(t);
      pts.push(ptStart1, ptEnd1);
    }
  }
  return pts;
};

function generateVertexColors(mainGridPts: Point[], alpha: number, col?: RGBAColor): Iterable<number> {
  return mainGridPts.flatMap(() => (col ? [col[0], col[1], col[2], alpha] : [0.9, 0.9, 1.0, alpha]));
}
