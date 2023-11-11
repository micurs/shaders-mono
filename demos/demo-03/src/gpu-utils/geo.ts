import * as WebGPU from '@shaders-mono/webgpu';
import { Gpu, Scene } from '@shaders-mono/webgpu';
import { Transform } from '@shaders-mono/geopro';
import { GeoTool } from '../types';

let sphereCounter = 0;
let planeCounter = 0;
let cubeCounter = 0;
let cylCounter = 0;

const buildPlane = (): Scene => {
  const plane = WebGPU.planeTriMesh(Transform.scale(40, 40, 1), {
    id: `ref-xyplane-${planeCounter++}`,
    color: [0.4, 0.4, 0.4, 0.5],
    steps: 10,
  });
  const grid = WebGPU.planeGridLines(Transform.scale(40, 40, 1), {
    id: `ref-xygrid-${planeCounter++}`,
    color: [0.6, 0.6, 1.0, 0.2],
    steps: 10,
  });
  return [[plane], [grid]];
};

const buildSphere = (): Scene => {
  const sphere = WebGPU.sphereTriMesh(Transform.translation(-5 + Math.random() * 10, -5 + Math.random() * 10, 0.5 + Math.random() * 10), {
    id: `sphere-${sphereCounter++}`,
    steps: 3,
    color: [Math.random(), 0.6, Math.random(), 1.0],
  });
  return [[sphere]];
};

const buildCube = (): Scene => {
  const cube = WebGPU.cubeTriMesh(Transform.translation(-5 + Math.random() * 10, -5 + Math.random() * 10, Math.random() * 10), {
    id: `cube-${cubeCounter++}`,
    color: [0.6, Math.random(), Math.random(), 1.0],
  });
  return [[cube]];
};

const buildCylinder = (): Scene => {
  const cylinder = WebGPU.cylinderTriMesh(Transform.translation(-5 + Math.random() * 10, -5 + Math.random() * 10, Math.random() * 10), {
    id: `cylinder-${cylCounter++}`,
    steps: 12,
    color: [Math.random(), Math.random(), 0.3, 1.0],
  });
  return [[cylinder]];
};

const buildGeoTool = (geoTool: GeoTool): Scene => {
  switch (geoTool) {
    case 'plane':
      return buildPlane();
    case 'sphere':
      return buildSphere();
    case 'cube':
      return buildCube();
    case 'cylinder':
      return buildCylinder();
    default:
      throw new Error(`Unknown geoTool: ${geoTool}`);
  }
};

export const addGpuGeo = (gpu: Gpu, geoTool: GeoTool) => {
  const geos = buildGeoTool(geoTool);
  gpu.addToScene(geos);
};
