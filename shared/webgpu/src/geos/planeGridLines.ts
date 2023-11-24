import { Point, Transform } from '@shaders-mono/geopro';
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

  const minDim = Math.min(s.x, s.y);

  const base10 = Math.log10(minDim);
  const mainAlpha = 1 - (base10 - Math.floor(base10));
  const nextAlpha = 1 - mainAlpha;
  const mainExpStep = Math.floor(base10) - 1;
  const nextExpStep = Math.floor(base10);
  const mainTileDim = Math.pow(10, Math.round(mainExpStep));
  const nextTileDim = Math.pow(10, Math.round(nextExpStep)) / 2;

  console.log('main tileDim', mainTileDim, ' on a size of:', minDim, 'with alpha', mainAlpha);
  console.log('next tileDim', nextTileDim, ' on a size of:', minDim, 'with alpha', nextAlpha);

  const mainNx = s.x / mainTileDim;
  const mainNy = s.y / mainTileDim;
  const mainStepX = 1.0 / mainNx;
  const mainStepY = 1.0 / mainNy;

  const nextNx = s.x / nextTileDim;
  const nextNy = s.y / nextTileDim;
  const nextStepX = 1.0 / nextNx;
  const nextStepY = 1.0 / nextNy;

  // X lines
  const mainGridPts = generateGridPoints(mainNx, mainNy, mainStepX, mainStepY, t);
  const nextGridPts = generateGridPoints(nextNx, nextNy, nextStepX, nextStepY, t);

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
  return geo;
};

export const planeGridLines = <B = null>(): PlaneGenerator<B> => planeGridGenerator;

const generateGridPoints = (nx: number, ny: number, stepX: number, stepY: number, t: Transform) => {
  const pts: Point[] = [];
  for (let xCol = 0; xCol < nx / 2; xCol++) {
    const ptStart0 = Point.fromValues(-stepX * xCol, -0.5, 0).map(t);
    const ptEnd0 = Point.fromValues(-stepX * xCol, +0.5, 0).map(t);
    pts.push(ptStart0, ptEnd0);

    if (stepX * (xCol + 1) < 0.5) {
      const ptStart1 = Point.fromValues(stepX * (xCol + 1), -0.5, 0).map(t);
      const ptEnd1 = Point.fromValues(stepX * (xCol + 1), +0.5, 0).map(t);
      pts.push(ptStart1, ptEnd1);
    }
  }
  for (let yRow = 0; yRow < ny / 2; yRow++) {
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
  return mainGridPts.flatMap(() => (col ? [col[0], col[1], col[2], alpha] : [0.6, 0.6, 0.6, alpha]));
}

