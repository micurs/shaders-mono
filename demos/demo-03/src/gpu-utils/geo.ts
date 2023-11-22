import * as WebGPU from '@shaders-mono/webgpu';
import { Gpu } from '@shaders-mono/webgpu';
import { Transform, Vector, deg2rad } from '@shaders-mono/geopro';
import * as OIMO from 'oimo';

import { GeoTool, Textures, WorldScene } from '../types';
import { addSphere, addBox, addCylinder, addStaticBox } from '../oimo/utils';

let sphereCounter = 0;
let planeCounter = 0;
let cubeCounter = 0;
let cylCounter = 0;

const batchCount = 25;

/**
 * Build the floor as a plane mesh on the XY plane
 * @param world
 * @returns
 */
const buildPlane = (world: OIMO.World): WorldScene => {
  const thickness = 0.1;
  const position = Vector.fromValues(0, 0, 0);
  const scale = Vector.fromValues(50, 50, thickness);

  const plane = WebGPU.planeTriMesh<OIMO.Body>()(Transform.identity(), {
    id: `ref-xyplane-${planeCounter++}`,
    colors: [[0.5, 0.5, 0.5, 0.5]],
    steps: 4,
  });
  plane.scale(scale);
  plane.translate(position.add(Vector.fromValues(0, 0, -thickness / 2)));

  const grid = WebGPU.planeGridLines()(Transform.identity(), {
    id: `ref-xygrid-${planeCounter++}`,
    colors: [[0.6, 0.6, 1.0, 0.3]],
    steps: 60,
  });
  grid.scale(scale);
  grid.translate(position);

  const body = addStaticBox(world, position, scale);
  plane.setBody(body);
  return [plane, grid];
};

const buildSphere = (gpu: Gpu, world: OIMO.World, image?: WebGPU.Material): WorldScene => {
  const spheres: WorldScene = [];

  for (let i = 0; i < batchCount; i++) {
    const position = Vector.fromValues(-8 + Math.random() * 16, -8 + Math.random() * 16, 20 + Math.random() * 10);
    const scale = Vector.fromValues(1, 1, 1);

    const sphere = WebGPU.sphereTriMesh<OIMO.Body>()(Transform.identity(), {
      id: `sphere-${sphereCounter++}`,
      steps: 2,
      textureIndexes: [0],
      // texture: image,
      // color: [Math.random(), 0.6, Math.random(), 1.0],
    });
    sphere.scale(scale);
    sphere.translate(position);

    const body = addSphere(world, position, scale);
    sphere.setBody(body);
    if (image) {
      sphere.setMaterial(image);
    }
    spheres.push(sphere);
  }

  return spheres;
};

const buildCube = (world: OIMO.World, image?: WebGPU.Material): WorldScene => {
  const cubes: WorldScene = [];

  for (let i = 0; i < batchCount; i++) {
    const position = Vector.fromValues(-8 + Math.random() * 16, -8 + Math.random() * 16, 20 + Math.random() * 10);
    const scale = Vector.fromValues(2, 2, 2);

    const cube = WebGPU.cubeTriMesh<OIMO.Body>()(Transform.identity(), {
      id: `cube-${cubeCounter++}`,
      // colors: [[0.8, Math.random(), Math.random(), 1.0]],
      textureIndexes: [0],
    });
    cube.scale(scale);
    cube.translate(position);

    const body = addBox(world, position, scale);
    cube.setBody(body);
    if (image) {
      cube.setMaterial(image);
    }
    cubes.push(cube);
  }
  return cubes;
};

const buildCylinder = (world: OIMO.World, image?: WebGPU.Material): WorldScene => {
  const cylinders: WorldScene = [];

  for (let i = 0; i < batchCount; i++) {
    const position = Vector.fromValues(-8 + Math.random() * 16, -8 + Math.random() * 16, 20 + Math.random() * 10);
    const scale = Vector.fromValues(2, 2, 2);

    const cylinder = WebGPU.cylinderTriMesh<OIMO.Body>()(Transform.rotationX(deg2rad(90)), {
      id: `cylinder-${cylCounter++}`,
      steps: 12,
      colors: [[Math.random(), Math.random(), 0.3, 1.0]],
      textureIndexes: [0],
    });
    cylinder.scale(scale);
    cylinder.translate(position);

    const body = addCylinder(world, position, Vector.fromValues(1.0, 2.0, 1));
    cylinder.setBody(body);
    if (image) {
      cylinder.setMaterial(image);
    }

    cylinders.push(cylinder);
  }
  return cylinders;
};

const buildGeoTool = (gpu: Gpu, geoTool: GeoTool, world: OIMO.World, textures: WebGPU.Material[]): WorldScene => {
  switch (geoTool) {
    case 'plane':
      return buildPlane(world);
    case 'sphere':
      return buildSphere(gpu, world, textures[0]);
    case 'cube':
      return buildCube(world, textures[1]);
    case 'cylinder':
      return buildCylinder(world, textures[2]);
    default:
      throw new Error(`Unknown geoTool: ${geoTool}`);
  }
};

export const addGpuGeo = (gpu: Gpu, world: OIMO.World, geoTool: GeoTool, textures: WebGPU.Material[]) => {
  const geos = buildGeoTool(gpu, geoTool, world, textures);
  gpu.addToScene(geos);
};
