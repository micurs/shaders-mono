import { Point, Transform, Vector } from '@shaders-mono/geopro';
import { GeoOptions, GeoGenerator, RGBAColor } from '../types';
import { GeoRenderable } from '../geo-renderable';

interface GridOptions {
  showAxes?: boolean;
}

interface PlaneGenerator<B> extends GeoGenerator<B, GridOptions> {}

export const planeGridGenerator: PlaneGenerator<any> = <B = null>(t: Transform, options: GeoOptions<GridOptions>): GeoRenderable<B> => {
  const { id, colors, showAxes } = options;

  // 0 - Determine the scale of the plane (x/y)
  const s = t.scaleVector;
  const minDim = Math.min(s.x, s.y);

  const base10 = Math.log10(minDim);
  const mainAlpha = Math.max(0.6 - (base10 - Math.floor(base10)), 0);
  const nextAlpha = Math.min(1.0, mainAlpha + 0.2);
  const prevAlpha = Math.max(0.15, mainAlpha - 0.3); // options.colors?.[0] ? options.colors[0][3] / 2 : mainAlpha * 0.5;
  const mainExpStep = Math.floor(base10) - 1;
  const nextExpStep = Math.floor(base10);
  const prevExpStep = Math.floor(base10) - 2;
  const mainTileDim = Math.pow(10, mainExpStep);
  const nextTileDim = Math.pow(10, nextExpStep);
  const prevTileDim = Math.pow(10, prevExpStep) * 2;

  console.log('prev tileDim', prevTileDim, 'with total grids', minDim / prevTileDim, ' with alpha', prevAlpha);
  console.log('main tileDim', mainTileDim, 'with total grids', minDim / mainTileDim, ' with alpha', mainAlpha);
  console.log('next tileDim', nextTileDim, 'with total grids', minDim / nextTileDim, ' with alpha', nextAlpha);

  // X lines
  const mainGridPts = generateGridPoints(s, mainTileDim, t, !showAxes);
  const nextGridPts = generateGridPoints(s, nextTileDim, t, !showAxes);

  // Create the GeoRenderable using 'line-list' as topology.
  const geo = new GeoRenderable<B>(id, 'line-list', options);

  if (showAxes) {
    const axes: Point[] = [];
    const xAxes0 = Point.fromValues(-0.0, 0, 0).map(t);
    const xAxes1 = Point.fromValues(+0.5, 0, 0).map(t);
    const yAxes0 = Point.fromValues(0, -0.0, 0).map(t);
    const yAxes1 = Point.fromValues(0, +0.5, 0).map(t);
    const zAxes0 = Point.fromValues(0, 0, 0).map(t);
    const zAxes1 = Point.fromValues(0, 0, mainTileDim);

    const xGrid0 = Point.fromValues(-0.5, 0, 0).map(t);
    const xGrid1 = Point.fromValues(+0.0, 0, 0).map(t);
    const yGrid0 = Point.fromValues(-0.0, -0.5, 0).map(t);
    const yGrid1 = Point.fromValues(+0.0, 0.0, 0).map(t);

    axes.push(xAxes0, xAxes1, yAxes0, yAxes1, zAxes0, zAxes1, xGrid0, xGrid1, yGrid0, yGrid1);
    const axesColors = [
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
      [0.1, 0.1, 1, 1],
      [0.1, 0.1, 1, 1],
      colors?.[0] ?? [0.5, 0.5, 0.5, 1],
      colors?.[0] ?? [0.5, 0.5, 0.5, 1],
      colors?.[0] ?? [0.5, 0.5, 0.5, 1],
      colors?.[0] ?? [0.5, 0.5, 0.5, 1],
    ];
    geo.addVertices(new Float32Array(axes.flatMap((p) => p.triplet)));
    geo.addColors(new Float32Array(axesColors.flat()));
  }

  geo.addVertices(new Float32Array(nextGridPts.flatMap((p) => p.triplet)));
  geo.addColors(new Float32Array(generateVertexColors(nextGridPts, nextAlpha, colors?.[0])));

  geo.addVertices(new Float32Array(mainGridPts.flatMap((p) => p.triplet)));
  geo.addColors(new Float32Array(generateVertexColors(mainGridPts, mainAlpha, colors?.[1])));

  if (minDim / prevTileDim < 100) {
    const prevGridPts = generateGridPoints(s, prevTileDim, t, !showAxes);
    geo.addVertices(new Float32Array(prevGridPts.flatMap((p) => p.triplet)));
    geo.addColors(new Float32Array(generateVertexColors(prevGridPts, prevAlpha, colors?.[2])));
  }

  return geo;
};

export const planeGridLines = <B = null>(): PlaneGenerator<B> => planeGridGenerator;

const generateGridPoints = (s: Vector, tileDim: number, t: Transform, renderZeroAxes: boolean = true) => {
  const nextNx = s.x / tileDim;
  const nextNy = s.y / tileDim;
  const stepX = 1.0 / nextNx;
  const stepY = 1.0 / nextNy;
  const zeroZ = -0.05;

  const pts: Point[] = [];
  if (renderZeroAxes) {
    const ptStart0 = Point.fromValues(0, -0.5, zeroZ).map(t);
    const ptEnd0 = Point.fromValues(0, +0.5, zeroZ).map(t);
    pts.push(ptStart0, ptEnd0);
  }

  for (let xCol = 1; xCol < nextNx / 2; xCol++) {
    const ptStart0 = Point.fromValues(-stepX * xCol, -0.5, zeroZ).map(t);
    const ptEnd0 = Point.fromValues(-stepX * xCol, +0.5, zeroZ).map(t);
    pts.push(ptStart0, ptEnd0);

    if (stepX * xCol < 0.5) {
      const ptStart1 = Point.fromValues(stepX * xCol, -0.5, zeroZ).map(t);
      const ptEnd1 = Point.fromValues(stepX * xCol, +0.5, zeroZ).map(t);
      pts.push(ptStart1, ptEnd1);
    }
  }

  if (renderZeroAxes) {
    const ptStart0 = Point.fromValues(-0.5, 0, zeroZ).map(t);
    const ptEnd0 = Point.fromValues(+0.5, 0, zeroZ).map(t);
    pts.push(ptStart0, ptEnd0);
  }

  for (let yRow = 1; yRow < nextNy / 2; yRow++) {
    const ptStart0 = Point.fromValues(-0.5, -stepY * yRow, zeroZ).map(t);
    const ptEnd0 = Point.fromValues(+0.5, -stepY * yRow, zeroZ).map(t);
    pts.push(ptStart0, ptEnd0);

    if (stepY * yRow < 0.5) {
      const ptStart1 = Point.fromValues(-0.5, stepY * yRow, zeroZ).map(t);
      const ptEnd1 = Point.fromValues(+0.5, stepY * yRow, zeroZ).map(t);
      pts.push(ptStart1, ptEnd1);
    }
  }
  return pts;
};

function generateVertexColors(mainGridPts: Point[], alpha: number, col?: RGBAColor): Iterable<number> {
  return mainGridPts.flatMap(() => col ?? [0.5, 0.5, 0.5, alpha]);
}
