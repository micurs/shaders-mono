import { Point, Transform, UnitVector, deg2rad } from '@shaders-mono/geopro';
import { DirectionalLight, Gpu, LightsTransformationHandlers, PointLight } from '@shaders-mono/webgpu';

export const buildLights = (gpu: Gpu): LightsTransformationHandlers => {
  const one60 = -deg2rad(180 / 20);

  const posSun = Point.fromValues(10.0, 0.0, -1.5);
  const posMoon = Point.fromValues(-12.0, 0.0, -3);

  gpu.setAmbientLight([0.0, 0.0, 0.0, 1.0]);

  const dirSun = UnitVector.fromVector(Point.origin().subtract(posSun));
  gpu.setLight('directional', 0, { dir: dirSun, col: [0.6, 0.6, 0.6, 1.0] });
  gpu.setLight('directional', 1, { dir: dirSun, col: [0.6, 0.6, 0.6, 0.0] });
  gpu.setLight('point', 0, { pos: posSun, col: [0.8, 0.8, 0.8, 1.0] });
  gpu.setLight('point', 1, { pos: posMoon, col: [0.2, 0.2, 0.5, 1.0] });
  gpu.setLight('point', 2, { pos: posMoon, col: [0.1, 0.1, 0.4, 0.0] });
  gpu.setLight('point', 3, { pos: posMoon, col: [0.1, 0.1, 0.4, 0.0] });

  let c = 0;
  return {
    dirLights: (msDelta: number, dirLights: DirectionalLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotZ = Transform.rotationZ(one60 * deltaSec);
      dirLights[0].dir = dirLights[0].dir.map(rotZ);
    },
    posLights: (msDelta: number, ptLights: PointLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotSunZ = Transform.rotationZ(one60 * deltaSec);
      const rotMoonZ = Transform.rotationZ(one60 * deltaSec * 1.2);
      ptLights[0].pos = ptLights[0].pos.map(rotSunZ);
      ptLights[1].pos = ptLights[1].pos.map(rotMoonZ);
      c += msDelta / 1000;
    },
  };
};
