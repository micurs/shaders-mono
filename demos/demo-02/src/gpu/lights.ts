import { Point, Transform, UnitVector, deg2rad } from '@shaders-mono/geopro';
import { Gpu, LightsTransformationHandlers, PointLight } from '@shaders-mono/webgpu';

export const buildLights = (gpu: Gpu): LightsTransformationHandlers => {
  const time = new Date();
  const s = time.getSeconds();
  const oneDeg = deg2rad(1);
  const one60 = -deg2rad(360 / 60);

  const posSec = Point.fromValues(0.0, 9.0, 3).map(Transform.rotationZ(one60 * s));

  gpu.setAmbientLight([0.0, 0.0, 0.0, 0.1]);
  gpu.setLight('directional', 0, { dir: UnitVector.fromValues(1, 1, -1.0), col: [0.5, 0.1, 0.1, 0.5] });
  gpu.setLight('directional', 1, { dir: UnitVector.fromValues(1.0, 0, 0.0), col: [0.1, 0.1, 0.3, 0.0] });
  gpu.setLight('point', 0, { pos: Point.fromValues(0.0, 0.0, 5), col: [0.55, 0.25, 0.25, 1.0] });
  gpu.setLight('point', 1, { pos: posSec, col: [0.35, 0.45, 0.7, 1.0] });
  gpu.setLight('point', 2, { pos: Point.fromValues(-6.0, 4.0, 4.5), col: [0.0, 0.1, 0.4, 1.0] });
  gpu.setLight('point', 3, { pos: Point.fromValues(-6.0, 14.0, 8.5), col: [0.2, 0.5, 0.0, 0.0] });

  return {
    posLights: (msDelta: number, lights: PointLight[]) => {
      const deltaSec = msDelta / 1000;
      const rotZ = Transform.rotationZ(one60 * deltaSec);
      const rotY = Transform.rotationY(deltaSec * oneDeg * 30);
      const rotX = Transform.rotationX(deltaSec * oneDeg * 15);
      lights[0].pos = lights[0].pos.map(rotX);
      lights[1].pos = lights[1].pos.map(rotZ);
      lights[2].pos = lights[2].pos.map(rotZ).map(rotX).map(rotZ);
      lights[3].pos = lights[3].pos.map(rotX).map(rotY).map(rotZ).map(rotY.invert());
    },
  };
};
