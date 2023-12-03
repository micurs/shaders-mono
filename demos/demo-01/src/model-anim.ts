import { Rotation, deg2rad } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';

let angleEarth = 0;
let angleClouds = 0;

export const buildModelAnim = (_gpu: WebGPU.Gpu) => {
  return {
    cone: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleEarth += deltaSec * deg2rad(360 / 10);
      const rotZ = Rotation.rotationX(angleEarth)
        .rotateY(angleEarth / 2)
        .rotateZ(angleEarth / 3);
      return {
        rotation: rotZ,
      };
    },
    'earth-clouds': (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleClouds -= deltaSec * 0.015;
      const rotZ = Rotation.rotationZ(angleClouds);
      return {
        rotation: rotZ,
      };
    },
    'earth-sphere': (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleEarth -= deltaSec * 0.022;
      const rotZ = Rotation.rotationY(deg2rad(23.5)).rotateZ(angleEarth);
      return {
        rotation: rotZ,
      };
    },
    cylinder: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleEarth += deltaSec * deg2rad(360 / 20);
      const rotZ = Rotation.rotationZ(angleEarth).rotateY(angleEarth);
      return {
        rotation: rotZ,
      };
    },
    cube: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleEarth += deltaSec * deg2rad(360 / 10);
      const rotZ = Rotation.rotationZ(angleEarth).rotateY(angleEarth).rotateZ(angleEarth);
      return {
        rotation: rotZ,
      };
    },
  };
};
