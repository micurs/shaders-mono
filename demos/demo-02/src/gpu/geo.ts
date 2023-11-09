import { Transform, deg2rad } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';
import type { ModelTransformationHandlers, Scene } from '@shaders-mono/webgpu';

const buildTicks = (l: string, radius: number, steps: number, scale: number, color: WebGPU.RGBAColor): Scene => {
  const ticks: Scene = [];
  for (let i = 0; i < steps; i++) {
    const angle = (i * Math.PI * 2) / steps;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const tick = WebGPU.sphereTriMesh(Transform.scale(scale, scale, scale).translation(x, y, 0), { id: `${l}-${i}`, steps: 3, color });
    ticks.push([tick]);
  }
  return ticks;
};

export const buildScene = async (gpu: WebGPU.Gpu): Promise<ModelTransformationHandlers> => {
  const time = new Date();
  const s = time.getSeconds();
  const m = time.getMinutes();
  const h = time.getHours();
  const one60 = -deg2rad(360 / 60);
  const one12 = -deg2rad(360 / 12);

  let secondsRotation = Transform.rotationZ(one60 * s);
  let minutesRotation = Transform.rotationZ(one60 * m);
  let hourRotation = Transform.rotationZ(one12 * ((h % 12) + m / 60));

  const secondsRotationAngle = one60;
  const minuteRotationAngle = secondsRotationAngle / 60;
  const hourRotationAngle = minuteRotationAngle / 12;

  const color3: WebGPU.RGBAColor = [0.8, 0.3, 1.0, 1.0];

  const plane = WebGPU.planeTriMesh(Transform.scale(80, 80, 1), {
    id: 'ref-xyplane',
    color: [0.4, 0.4, 0.4, 0.1],
    steps: 10,
  });
  const grid = WebGPU.planeGridLines(Transform.scale(80, 80, 1), {
    id: 'ref-xygrid',
    color: [0.6, 0.6, 1.0, 0.2],
    steps: 10,
  });

  const seconds = WebGPU.cubeTriMesh(Transform.scale(0.3, 0.3, 7.0).rotationX(deg2rad(90)).translation(0.0, 5.5, 1), {
    id: 'seconds',
    color: color3,
  });
  const minutes = WebGPU.cylinderTriMesh(Transform.scale(0.4, 0.4, 5.0).rotationX(deg2rad(90)).translation(0, 6, 0), {
    id: 'minutes',
    steps: 12,
    color: [1.0, 1.0, 0.0, 1.0],
  });
  const hour = WebGPU.cylinderTriMesh(Transform.scale(0.8, 0.8, 4.0).rotationX(deg2rad(90)).translation(0, 6, -1), {
    id: 'hours',
    steps: 12,
    color: [1.0, 0.2, 0.3, 1.0],
  });

  const sphere0 = WebGPU.sphereTriMesh(
    Transform.scale(4, 4, 4), // , // Keep the sphere in the center
    { id: 'sphere-center', steps: 3, color: [0.7, 0.7, 0.8, 0.8] }
  );

  const minuteTicks = buildTicks('minute-tick', 10, 60, 0.5, [0.7, 0.2, 0.3, 1.0]);
  const fiveMinTicks = buildTicks('five-min-tick', 10, 12, 1.2, [0.1, 0.6, 0.2, 1.0]);
  const scene: Scene = [[grid], [seconds], [sphere0], [minutes], [hour], ...minuteTicks, ...fiveMinTicks, [plane]];
  await gpu.setScene(scene);

  return {
    seconds: (msDelta: number) => {
      const sec = msDelta / 1000;
      secondsRotation = secondsRotation.compose(Transform.rotationZ(secondsRotationAngle * sec));
      return secondsRotation;
    },
    minutes: (msDelta: number) => {
      const sec = msDelta / 1000;
      minutesRotation = minutesRotation.compose(Transform.rotationZ(minuteRotationAngle * sec));
      return minutesRotation;
    },
    hours: (msDelta: number) => {
      const sec = msDelta / 1000;
      hourRotation = hourRotation.compose(Transform.rotationZ(hourRotationAngle * sec));
      return hourRotation;
    },
  };
};
