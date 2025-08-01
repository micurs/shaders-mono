import { Rotation, Vector } from '@shaders-mono/geopro';
import * as OIMO from 'oimo';
import * as WebGPU from '@shaders-mono/webgpu';

export const createWorld = (): OIMO.World => {
  return new OIMO.World({
    timestep: 1 / 30,
    info: true,
    worldscale: 1,
    gravity: [0, 0, -9.8],
  });
};

export const addSphere = (world: OIMO.World, pos: Vector, dim: Vector, _mass: number = 1): OIMO.Body => {
  return world.add({
    type: 'sphere',
    size: dim.triplet,
    pos: pos.triplet,
    move: true,
    density: 2,
    world: world,
    restitution: 0.5,
    friction: 0.3,
  });
};

export const addBox = (world: OIMO.World, pos: Vector, dim: Vector, rot: [number, number, number], _mass: number = 1): OIMO.Body => {
  return world.add({
    type: 'box',
    size: dim.triplet,
    pos: pos.triplet,
    rot,
    rotShape: rot,
    move: true,
    density: 1,
    world: world,
    restitution: 0.5,
    friction: 0.3,
  });
};

export const addCylinder = (world: OIMO.World, pos: Vector, dim: Vector, rot: [number, number, number], _mass: number = 1): OIMO.Body => {
  return world.add({
    type: 'cylinder',
    size: dim.triplet,
    pos: pos.triplet,
    rot,
    move: true,
    density: 1,
    world: world,
    restitution: 0.5,
    friction: 0.3,
  });
};

export const addStaticBox = (world: OIMO.World, position: Vector, scale: Vector) => {
  const body = world.add({
    type: 'box',
    size: [scale.x, scale.y, scale.z],
    pos: [position.x, position.y, position.z],
    rot: [0, 0, 0],
    move: false,
    density: 1,
    friction: 0.5,
    restitution: 0.2,
  }) as OIMO.Body;
  body.name = 'floor';
  return body;
};

export const updatePhysics = (world: OIMO.World, gpu: WebGPU.Gpu) => {
  const scene = gpu.getScene<OIMO.Body>();
  world.step();
  scene.forEach((geo) => {
    const body = geo.body;
    if (body && body.isDynamic) {
      const bp = body.getPosition();
      if (bp.z < -20) {
        world.remove(body);
        gpu.removeFromScene(geo.id);
      }
      const bq = body.getQuaternion();
      const pos = Vector.fromValues(bp.x, bp.y, bp.z);
      const rot = Rotation.fromValues(bq.x, bq.y, bq.z, bq.w);
      geo.rotoTranslate(rot, pos);
    }
  });
};
