import { Rotation, deg2rad } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';

let angleEarth = 0;
let angleClouds = 0;

export const buildModelAnim = (_gpu: WebGPU.Gpu) => {
  return {
    'earth-clouds': (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleClouds += deltaSec * 0.014;
      const rotZ = Rotation.rotationZ(angleClouds);
      return {
        rotation: rotZ,
      };
    },
    'earth-sphere': (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleEarth += deltaSec * 0.01;
      const rotZ = Rotation.rotationZ(angleEarth);
      return {
        rotation: rotZ,
      };
    },
    cylinder: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleEarth += deltaSec * deg2rad(360 / 20);
      const rotZ = Rotation.rotationZ(angleEarth).compose(Rotation.rotationY(angleEarth));
      return {
        rotation: rotZ,
      };
    },
    cube: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angleEarth += deltaSec * deg2rad(360 / 10);
      const rotZ = Rotation.rotationZ(angleEarth).compose(Rotation.rotationY(angleEarth)).compose(Rotation.rotationZ(angleEarth));
      return {
        rotation: rotZ,
      };
    },
  };
};
