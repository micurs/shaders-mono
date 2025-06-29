import * as WebGPU from '@shaders-mono/webgpu';
import { Gpu } from '@shaders-mono/webgpu';
import { Rotation, Transform, Vector, deg2rad } from '@shaders-mono/geopro';
import * as OIMO from 'oimo';

import { GeoTool, WorldScene } from '../types';
import { addSphere, addBox, addCylinder, addStaticBox } from './oimo-integration';

let sphereCounter = 0;
let planeCounter = 0;
let cubeCounter = 0;
let cylCounter = 0;

const batchCount = 18;
const windowSize = 14;
const height = 20;

/**
 * Build the floor as a plane mesh on the XY plane
 * @param world
 * @returns
 */
export const buildPlane = (world: OIMO.World): WorldScene => {
  const thickness = 0.1;
  const position = Vector.fromValues(0, 0, 0);
  const scale = Vector.fromValues(120, 120, thickness);

  const plane = WebGPU.planeTriMesh<OIMO.Body>()(Transform.identity(), {
    id: `ref-xyplane-${planeCounter++}`,
    colors: [[0.3, 0.3, 0.3, 0.9]],
    steps: 4,
  });
  plane.scale(scale);
  plane.translate(position.add(Vector.fromValues(0, 0, -thickness / 2)));

  const grid = WebGPU.planeGridLines()(Transform.scale(scale.x, scale.y, scale.z), {
    id: `ref-xygrid-${planeCounter++}`,
    colors: [
      [1.0, 1.0, 1.0, 0.8],
      [1.0, 1.0, 1.0, 0.4],
      [1.0, 1.0, 1.0, 0.1],
    ],
    showAxes: true,
  });
  // grid.scale(scale);
  grid.translate(position);

  const body = addStaticBox(world, position, scale);
  plane.setBody(body);
  return [plane, grid];
};

const buildSphere = (world: OIMO.World, image?: WebGPU.Material): WorldScene => {
  const spheres: WorldScene = [];

  for (let i = 0; i < batchCount; i++) {
    const position = Vector.fromValues(
      -windowSize + Math.random() * windowSize * 2,
      -windowSize + Math.random() * windowSize * 2,
      height + Math.random() * windowSize * 2
    );
    const scale = Vector.fromValues(1, 1, 1);

    const sphere = WebGPU.sphereTriMesh<OIMO.Body>()(Transform.identity(), {
      id: `sphere-${sphereCounter++}`,
      steps: 2,
      textureCoordinates: true,
      colors: [[Math.random(), Math.random(), Math.random(), 1.0]],
      // texture: image,
      // color: [Math.random(), 0.6, Math.random(), 1.0],
    });
    sphere.scale(scale);
    sphere.translate(position);

    const body = addSphere(world, position, scale);
    sphere.setBody(body);
    if (image) {
      sphere.addMaterial(image);
    }
    spheres.unshift(sphere);
  }

  return spheres;
};

const buildCube = (world: OIMO.World, image?: WebGPU.Material): WorldScene => {
  const cubes: WorldScene = [];

  for (let i = 0; i < batchCount; i++) {
    const position = Vector.fromValues(
      -windowSize + Math.random() * windowSize * 2,
      -windowSize + Math.random() * windowSize * 2,
      height + Math.random() * windowSize * 2
    );
    const scale = Vector.fromValues(2, 2, 2);
    const rotations: [number, number, number] = [Math.random() * 90, Math.random() * 90, Math.random() * 90];
    const rot = Rotation.fromAngles(...(rotations.map(deg2rad) as [number, number, number]));
    const cube = WebGPU.cubeTriMesh<OIMO.Body>()(Transform.identity(), {
      id: `cube-${cubeCounter++}`,
      colors: [[Math.random(), Math.random(), Math.random(), 1.0]],
      textureCoordinates: image ? true : false,
      textureAlpha: 0.5,
    });
    cube.scale(scale);
    cube.translate(position);
    cube.rotate(rot);
    const body = addBox(world, position, scale, rotations);
    cube.setBody(body);
    if (image) {
      cube.addMaterial(image);
    }
    cubes.push(cube);
  }
  return cubes;
};

const buildCylinder = (world: OIMO.World, image?: WebGPU.Material): WorldScene => {
  const cylinders: WorldScene = [];

  for (let i = 0; i < batchCount; i++) {
    const position = Vector.fromValues(
      -windowSize + Math.random() * windowSize * 2,
      -windowSize + Math.random() * windowSize * 2,
      height + Math.random() * windowSize * 2
    );
    const rotations: [number, number, number] = [Math.random() * 90, Math.random() * 90, Math.random() * 90];
    const rot = Rotation.fromAngles(...(rotations.map(deg2rad) as [number, number, number]));
    const scale = Vector.fromValues(2, 2, 2);

    const cylinder = WebGPU.cylinderTriMesh<OIMO.Body>()(Transform.rotationX(deg2rad(90)), {
      id: `cylinder-${cylCounter++}`,
      steps: 12,
      colors: [[Math.random(), Math.random(), 0.3, 1.0]],
      textureCoordinates: true,
      textureAlpha: 0.6,
    });
    cylinder.scale(scale);
    cylinder.translate(position);
    cylinder.rotate(rot);

    const body = addCylinder(world, position, Vector.fromValues(1.0, 2.0, 1), rotations);
    cylinder.setBody(body);
    if (image) {
      cylinder.addMaterial(image);
    }

    cylinders.push(cylinder);
  }
  return cylinders;
};

const buildGeoTool = (geoTool: GeoTool, world: OIMO.World, textures: WebGPU.Material[]): WorldScene => {
  switch (geoTool) {
    case 'plane':
      return buildPlane(world);
    case 'sphere':
      return buildSphere(world, textures[0]);
    case 'cube':
      return buildCube(world, textures[1]);
    case 'cylinder':
      return buildCylinder(world, textures[2]);
    default:
      throw new Error(`Unknown geoTool: ${geoTool}`);
  }
};

export const addGpuGeo = (gpu: Gpu, world: OIMO.World, geoTool: GeoTool, textures: WebGPU.Material[]) => {
  const geos = buildGeoTool(geoTool, world, textures);
  gpu.addToScene(geos);
};
