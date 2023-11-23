import { Rotation, deg2rad } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';

let angle = 0;

export const buildModelAnim = (gpu: WebGPU.Gpu) => {
  return {
    'earth-sphere': (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angle += deltaSec * deg2rad(360 / 180);
      const rotZ = Rotation.rotationZ(angle);
      return {
        rotation: rotZ,
      };
    },
    cylinder: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angle += deltaSec * deg2rad(360 / 20);
      const rotZ = Rotation.rotationZ(angle).compose(Rotation.rotationY(angle));
      return {
        rotation: rotZ,
      };
    },
    cube: (msDelta: number) => {
      const deltaSec = msDelta / 1000;
      angle += deltaSec * deg2rad(360 / 10);
      const rotZ = Rotation.rotationZ(angle).compose(Rotation.rotationY(angle)).compose(Rotation.rotationZ(angle));
      return {
        rotation: rotZ,
      };
    },
  };
};
