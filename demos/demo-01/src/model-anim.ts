import { Rotation, deg2rad } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';

let angle = 0;
let angleClouds = 0;

export const buildModelAnim = (_gpu: WebGPU.Gpu) => {
  return {
    plane: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angle += deltaSec * deg2rad(360 / 40);
      const rotZ = Rotation.rotationZ(angle).rotateY(angle / 2);
      return {
        rotation: rotZ,
      };
    },
    cone: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angle += deltaSec * deg2rad(360 / 10);
      const rotZ = Rotation.rotationX(angle)
        .rotateY(angle / 2)
        .rotateZ(angle / 3);
      return {
        rotation: rotZ,
      };
    },
    'earth-clouds': (msDelta: number) => {
      const deltaSec = msDelta / 2000;
      angleClouds -= deltaSec * 0.02;
      const rotZ = Rotation.rotationY(deg2rad(-12.4)).rotateZ(angleClouds);
      return {
        rotation: rotZ,
      };
    },
    'earth-sphere': (msDelta: number) => {
      const deltaSec = msDelta / 2000;
      angle -= deltaSec * 0.025;
      const rotZ = Rotation.rotationY(deg2rad(-12.4)).rotateZ(angle);
      return {
        rotation: rotZ,
      };
    },
    cylinder: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angle += deltaSec * deg2rad(360 / 20);
      const rotZ = Rotation.rotationZ(angle).rotateY(angle);
      return {
        rotation: rotZ,
      };
    },
    cube: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angle += deltaSec * deg2rad(360 / 10);
      const rotZ = Rotation.rotationZ(angle).rotateY(angle).rotateZ(angle);
      return {
        rotation: rotZ,
      };
    },
  };
};
