import { Point, Transform, UnitVector, deg2rad } from '@shaders-mono/geopro';
import { DirectionalLight, Gpu, LightsTransformationHandlers, PointLight } from '@shaders-mono/webgpu';
import { GeoType } from './model-builder';

export const buildLights = (gpu: Gpu, geo: GeoType): LightsTransformationHandlers => {
  const one60 = -deg2rad(180 / 20);

  const posSun = Point.fromValues(30.0, 0.0, 0);
  const posMoon = Point.fromValues(-8.0, 0.0, -1);

  gpu.setAmbientLight([0.01, 0.01, 0.01, 0.01]);

  const dirSun = UnitVector.fromVector(Point.origin().subtract(posSun));
  const dirMoon = UnitVector.fromVector(Point.origin().subtract(posMoon));
  gpu.setLight('directional', 0, { dir: dirSun, col: [0.55, 0.55, 0.5, 0.0] });
  gpu.setLight('directional', 1, { dir: dirMoon, col: [0.6, 0.6, 0.6, 0.0] });
  gpu.setLight('point', 0, { pos: posSun, col: [0.8, 0.8, 0.7, 0.0] });
  gpu.setLight('point', 1, { pos: posMoon, col: [0.18, 0.18, 0.4, 0.0] });
  gpu.setLight('point', 2, { pos: posMoon, col: [0.1, 0.1, 0.4, 0.0] });
  gpu.setLight('point', 3, { pos: posMoon, col: [0.1, 0.1, 0.4, 0.0] });

  switch (geo) {
    case 'globe':
      gpu.setLight('directional', 0, { dir: dirSun, col: [0.6, 0.6, 0.6, 0.6] });
      gpu.setLight('directional', 1, { dir: dirMoon, col: [0.18, 0.18, 0.4, 0.2] });
      gpu.setLight('point', 0, { pos: posSun, col: [0.8, 0.8, 0.7, 1.0] });
      gpu.setLight('point', 1, { pos: posMoon, col: [0.18, 0.18, 0.4, 0.8] });
      break;
    case 'cylinder':
      gpu.setAmbientLight([0.1, 0.1, 0.1, 0.01]);
      gpu.setLight('point', 0, { pos: Point.fromValues(20.0, 0.0, 0), col: [0.8, 0.5, 0.5, 1.0] });
      gpu.setLight('point', 1, { pos: Point.fromValues(-20.0, 0.0, 0), col: [0.4, 0.6, 0.8, 1.0] });
      gpu.setLight('point', 2, { pos: Point.fromValues(10.0, 10.0, 0), col: [0.5, 0.5, 0.5, 0.3] });
      break;
    case 'cube':
      gpu.setAmbientLight([0.15, 0.15, 0.15, 0.1]);
      gpu.setLight('point', 0, { pos: Point.fromValues(5.0, 0.0, 0), col: [0.7, 0.7, 0.7, 1.0] });
      break;
    case 'cone':
      gpu.setAmbientLight([0.5, 0.5, 0.5, 0.1]);
      gpu.setLight('point', 0, { pos: Point.fromValues(10.0, 0.0, 0), col: [0.4, 0.8, 0.4, 0.6] });
      gpu.setLight('point', 1, { pos: Point.fromValues(-10.0, 10.0, 0), col: [0.8, 0.4, 0.4, 0.6] });
      break;
    case 'plane':
      gpu.setAmbientLight([0.5, 0.5, 0.5, 0.1]);
      gpu.setLight('directional', 0, { dir: UnitVector.fromValues(0, -1, 0), col: [1.0, 1.0, 1.0, 1.0] });
      gpu.setLight('directional', 1, { dir: UnitVector.fromValues(0, 1, 0), col: [1.0, 1.0, 1.0, 1.0] });
      gpu.setLight('point', 0, { pos: Point.fromValues(10.0, 0.0, 0), col: [0.4, 0.8, 0.4, 0.6] });
      gpu.setLight('point', 1, { pos: Point.fromValues(-10.0, 10.0, 0), col: [0.8, 0.4, 0.4, 0.6] });
      break;
  }
  console.log('Lights initialized:', geo);

  return {
    dirLights: (msDelta: number, dirLights: DirectionalLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotZ = Transform.rotationZ(one60 * deltaSec);
      dirLights[0].dir = dirLights[0].dir.map(rotZ);
    },
    posLights: (msDelta: number, ptLights: PointLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotSunZ = Transform.rotationZ(one60 * deltaSec * 1.5);
      const rotMoonZ = Transform.rotationZ(one60 * deltaSec);
      ptLights[0].pos = ptLights[0].pos.map(rotSunZ);
      ptLights[1].pos = ptLights[1].pos.map(rotMoonZ);
    },
  };
};
