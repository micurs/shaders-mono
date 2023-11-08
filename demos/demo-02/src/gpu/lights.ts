import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { Gpu, LightsTransformationHandlers, PointLight } from '@shaders-mono/webgpu';

export const buildLights = (gpu: Gpu): LightsTransformationHandlers => {
  const oneDeg = Math.PI / 180;

  gpu.setAmbientLight([0.0, 0.0, 0.0, 1.0]);
  gpu.setLight('directional', 0, { dir: UnitVector.fromValues(0.0, 0, 1.0), col: [0.3, 0.3, 0.3, 0.0] });
  gpu.setLight('point', 0, { pos: Point.fromValues(0.0, 0.0, 4), col: [1.0, 1.0, 1.0, 1.0] });
  gpu.setLight('point', 1, { pos: Point.fromValues(4.0, 4.0, +2.5), col: [0.3, 0.3, 0.1, 0.0] });
  gpu.setLight('point', 2, { pos: Point.fromValues(-6.0, 4.0, 4.5), col: [0.0, 0.1, 0.4, 0.0] });
  gpu.setLight('point', 3, { pos: Point.fromValues(-6.0, 14.0, 8.5), col: [0.2, 0.5, 0.0, 0.0] });

  return {
    posLights: (msDelta: number, lights: PointLight[]) => {
      const onceDegSec = (msDelta / 1000) * oneDeg;
      const rotZ = Transform.rotationZ(onceDegSec * 45);
      const rotY = Transform.rotationY(onceDegSec * 30);
      const rotX = Transform.rotationX(onceDegSec * 15);
      lights[0].pos = lights[0].pos.map(rotX);
      lights[1].pos = lights[1].pos.map(rotX).map(rotY);
      lights[2].pos = lights[2].pos.map(rotZ).map(rotX).map(rotZ);
      lights[3].pos = lights[3].pos.map(rotX).map(rotY).map(rotZ).map(rotY.invert());
    },
  };
};
