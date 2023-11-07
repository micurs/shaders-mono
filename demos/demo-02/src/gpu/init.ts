import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';
import type { Scene } from '@shaders-mono/webgpu';

const buildScene = async (): Promise<Scene> => {
  const color2: WebGPU.RGBAColor = [0.5, 0.5, 1.0, 1.0];
  const color3: WebGPU.RGBAColor = [0.8, 0.3, 1.0, 1.0];

  const plane = WebGPU.planeTriMesh(Transform.translation(0, 0, 0).scale(800, 800, 1), { color: [0.4, 0.4, 0.4, 0.2], steps: 10 });
  const grid = WebGPU.planeGridLines(Transform.translation(0, 0, 0).scale(800, 800, 1), { color: [0.6, 0.6, 1.0, 0.3], steps: 10 });

  const cube = WebGPU.cubeTriMesh(
    Transform.rotationX(Math.PI / 3)
      .rotationZ(Math.PI * 0.2)
      .translation(-5, 0, 1),
    { color: color3 }
  );
  const cylinder = WebGPU.cylinderTriMesh(
    Transform.rotationY(Math.PI * 0.7).translation(5, 0, 1), // move to the right
    { steps: 12, color: color2 }
  );

  const sphere0 = WebGPU.sphereTriMesh(
    Transform.scale(3.5, 3.5, 3.5), // , // Keep the sphere in the center
    { steps: 3, color: [0.8, 0.8, 1.0, 1.0] }
  );

  const sphere1 = WebGPU.sphereTriMesh(
    Transform.scale(1.5, 1.5, 1.5).translation(-15, -15, 0.0), // , // Keep the sphere in the center
    { steps: 3, color: [1.0, 0.0, 0.0, 1.0] }
  );
  const sphere2 = WebGPU.sphereTriMesh(
    Transform.scale(1.5, 1.5, 1.5).translation(15, 15, 0.0), // , // Keep the sphere in the center
    { steps: 3, color: [0, 0, 1, 1] }
  );
  const sphere3 = WebGPU.sphereTriMesh(
    Transform.scale(1.5, 1.5, 1.5).translation(15, -15, 0.0), // , // Keep the sphere in the center
    { steps: 3, color: [0, 1, 0, 1] }
  );
  const sphere4 = WebGPU.sphereTriMesh(
    Transform.scale(1.5, 1.5, 1.5).translation(-15, 15, 0.0), // , // Keep the sphere in the center
    { steps: 3, color: [1, 1, 0, 1] }
  );

  return [[cube], [sphere0], [sphere1], [sphere2], [sphere3], [sphere4], [cylinder], [plane], [grid]];
};

export const init = async (canvas: HTMLCanvasElement) => {
  const gpu = await WebGPU.initialize(canvas);
  await gpu.setupShaders('standard-3d');

  const scene = await buildScene();
  await gpu.setupGeoBuilder(scene);

  gpu.setAmbientLight([0.2, 0.2, 0.2, 1.0]);
  gpu.setLight('directional', 0, { dir: UnitVector.fromValues(0.0, -1.5, -0.5), col: [0.3, 0.3, 0.3, 1.0] });
  gpu.setLight('point', 0, { pos: Point.fromValues(2.0, 2.0, -0.5), col: [0.5, 0.1, 0.1, 1.0] });
  gpu.setLight('point', 1, { pos: Point.fromValues(4.0, 4.0, +2.5), col: [0.3, 0.3, 0.1, 1.0] });
  gpu.setLight('point', 2, { pos: Point.fromValues(-6.0, 4.0, 4.5), col: [0.0, 0.1, 0.4, 1.0] });
  gpu.setLight('point', 3, { pos: Point.fromValues(-6.0, 14.0, 8.5), col: [0.2, 0.5, 0.0, 1.0] });

  const rotZ = Transform.rotationX(-Math.PI / 640);
  const rotY = Transform.rotationX(-Math.PI / 240);
  const rotX = Transform.rotationX(-Math.PI / 360);

  const [mouseHandlers, viewHandlers] = WebGPU.getOrbitHandlers(gpu);
  gpu.captureMouseMotion(mouseHandlers);
  gpu.beginRenderLoop({
    camera: viewHandlers,
    lights: {
      posLights: (lights: WebGPU.PointLight[]) => {
        lights[0].pos = lights[0].pos.map(rotZ);
        lights[1].pos = lights[1].pos.map(rotX).map(rotZ);
        lights[2].pos = lights[2].pos.map(rotZ).map(rotX).map(rotZ);
        lights[3].pos = lights[3].pos.map(rotX).map(rotY).map(rotZ).map(rotY.invert());
      },
    },
  });
  return gpu;
};
