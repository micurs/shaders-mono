import { Point, Transform, UnitVector, deg2rad } from '@shaders-mono/geopro';
import { DirectionalLight, Gpu, LightsTransformationHandlers, PointLight } from '@shaders-mono/webgpu';

export const buildLights = (gpu: Gpu): LightsTransformationHandlers => {
  const one60 = -deg2rad(180 / 10);

  const posSun = Point.fromValues(10.0, 0.0, 0);
  const posMoon = Point.fromValues(-5.0, 0.0, 3);

  gpu.setAmbientLight([0.1, 0.1, 0.2, 1.0]);

  const dirSun = UnitVector.fromVector(Point.origin().subtract(posSun));
  gpu.setLight('directional', 0, { dir: dirSun, col: [0.9, 0.9, 0.9, 1.0] });
  gpu.setLight('point', 0, { pos: posSun, col: [0.5, 0.5, 0.45, 1.0] });
  gpu.setLight('point', 1, { pos: posMoon, col: [0.1, 0.1, 0.4, 1.0] });

  return {
    dirLights: (msDelta: number, dirLights: DirectionalLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotZ = Transform.rotationZ(one60 * deltaSec);
      dirLights[0].dir = dirLights[0].dir.map(rotZ);
    },
    posLights: (msDelta: number, ptLights: PointLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotZ = Transform.rotationZ(one60 * deltaSec);
      ptLights[0].pos = ptLights[0].pos.map(rotZ);
      ptLights[1].pos = ptLights[1].pos.map(rotZ);
    },
  };
};
