import * as WebGPU from '@shaders-mono/webgpu';
import { Gpu, Scene } from '@shaders-mono/webgpu';
import { Transform } from '@shaders-mono/geopro';
import { GeoTool } from '../types';

let sphereCounter = 0;
let planeCounter = 0;

const buildPlane = (): Scene => {
  const plane = WebGPU.planeTriMesh(Transform.scale(20, 20, 1), {
    id: `ref-xyplane-${planeCounter++}`,
    color: [0.4, 0.4, 0.4, 0.5],
    steps: 10,
  });
  const grid = WebGPU.planeGridLines(Transform.scale(20, 20, 1), {
    id: `ref-xygrid-${planeCounter++}`,
    color: [0.6, 0.6, 1.0, 0.2],
    steps: 10,
  });
  return [[plane], [grid]];
};

const buildSphere = (): Scene => {
  const sphere = WebGPU.sphereTriMesh(Transform.identity(), {
    id: `sphere-${sphereCounter++}`,
    steps: 5,
    color: [0.6, 0.6, 0.6, 1.0],
  });
  return [[sphere]];
};

const buildGeoTool = (geoTool: GeoTool): Scene => {
  switch (geoTool) {
    case 'plane':
      return buildPlane();
    case 'sphere':
      return buildSphere();
    default:
      throw new Error(`Unknown geoTool: ${geoTool}`);
  }
};

export const addGpuGeo = (gpu: Gpu, geoTool: GeoTool) => {
  const geos = buildGeoTool(geoTool);
  gpu.addToScene(geos);
};
