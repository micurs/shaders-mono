import { Point, Transform, UnitVector, deg2rad } from '@shaders-mono/geopro';
import { DirectionalLight, Gpu, LightsTransformationHandlers, PointLight } from '@shaders-mono/webgpu';

export const buildLights = (gpu: Gpu): LightsTransformationHandlers => {
  const one60 = -deg2rad(180 / 20);

  const posSun = Point.fromValues(8.0, 0.0, 0);
  const posMoon = Point.fromValues(-6.0, 0.0, -1);

  gpu.setAmbientLight([0.15, 0.15, 0.15, 1.0]);

  const dirSun = UnitVector.fromVector(Point.origin().subtract(posSun));
  gpu.setLight('directional', 0, { dir: dirSun, col: [0.55, 0.55, 0.5, 1.0] });
  gpu.setLight('directional', 1, { dir: UnitVector.fromValues(0, 0, 1), col: [0.6, 0.6, 0.6, 0.0] });
  gpu.setLight('point', 0, { pos: posSun, col: [0.6, 0.6, 0.55, 18.0] });
  gpu.setLight('point', 1, { pos: posMoon, col: [0.14, 0.14, 0.35, 14.0] });
  gpu.setLight('point', 2, { pos: posMoon, col: [0.1, 0.1, 0.4, 0.0] });
  gpu.setLight('point', 3, { pos: posMoon, col: [0.1, 0.1, 0.4, 0.0] });

  return {
    dirLights: (msDelta: number, dirLights: DirectionalLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotZ = Transform.rotationZ(one60 * deltaSec);
      dirLights[0].dir = dirLights[0].dir.map(rotZ);
    },
    posLights: (msDelta: number, ptLights: PointLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotSunZ = Transform.rotationZ(one60 * deltaSec);
      const rotMoonZ = Transform.rotationZ(one60 * deltaSec * 1.02);
      ptLights[0].pos = ptLights[0].pos.map(rotSunZ);
      ptLights[1].pos = ptLights[1].pos.map(rotMoonZ);
    },
  };
};
