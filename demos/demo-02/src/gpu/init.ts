import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';
import type { Scene } from '@shaders-mono/webgpu';

const buildScene = async (): Promise<Scene> => {
  const color2: WebGPU.RGBAColor = [0.5, 0.5, 1.0, 1.0];
  const color3: WebGPU.RGBAColor = [0.8, 0.3, 1.0, 1.0];

  const plane = WebGPU.planeTriMesh(Transform.scale(800, 800, 1), {
    id: 'ref-xyplane',
    color: [0.4, 0.4, 0.4, 0.4],
    steps: 10,
  });
  const grid = WebGPU.planeGridLines(Transform.scale(800, 800, 1), {
    id: 'ref-xygrid',
    color: [0.6, 0.6, 1.0, 0.6],
    steps: 10,
  });

  const cube = WebGPU.cubeTriMesh(
    Transform.scale(2.5, 2.5, 2.5).translation(0, 1, 1),
    // Transform.rotationX(Math.PI / 3).rotationZ(Math.PI * 0.2).translation(-5, 0, 1),
    { id: 'cube-1', color: color3 }
  );
  const cylinder = WebGPU.cylinderTriMesh(
    Transform.scale(2.5, 2.5, 2.5),
    // Transform.rotationY(Math.PI * 0.7).translation(5, 0, 1), // move to the right
    { id: 'cyl-1', steps: 12, color: color2 }
  );

  const sphere0 = WebGPU.sphereTriMesh(
    Transform.scale(3.5, 3.5, 3.5), // , // Keep the sphere in the center
    { id: 'sphere-center', steps: 3, color: [0.8, 0.8, 1.0, 1.0] }
  );

  return [[cube], [sphere0], [cylinder], [plane], [grid]];
};

export const init = async (canvas: HTMLCanvasElement) => {
  const gpu = await WebGPU.initialize(canvas);
  await gpu.setupShaders('standard-3d');

  const scene = await buildScene();
  await gpu.setScene(scene);

  gpu.setAmbientLight([0.0, 0.0, 0.0, 1.0]);
  gpu.setLight('directional', 0, { dir: UnitVector.fromValues(0.0, -1.5, -0.5), col: [0.3, 0.3, 0.3, 1.0] });
  gpu.setLight('point', 0, { pos: Point.fromValues(2.0, 2.0, -0.5), col: [0.5, 0.1, 0.1, 1.0] });
  gpu.setLight('point', 1, { pos: Point.fromValues(4.0, 4.0, +2.5), col: [0.3, 0.3, 0.1, 1.0] });
  gpu.setLight('point', 2, { pos: Point.fromValues(-6.0, 4.0, 4.5), col: [0.0, 0.1, 0.4, 1.0] });
  gpu.setLight('point', 3, { pos: Point.fromValues(-6.0, 14.0, 8.5), col: [0.2, 0.5, 0.0, 1.0] });

  let t = 0;
  const mRotZStep = -Math.PI / 360;
  const mRotXStep = -Math.PI / 120;
  let mrotZ = Transform.rotationZ(mRotZStep);
  let mrotX = Transform.rotationX(-Math.PI / 120);
  const rotZ = Transform.rotationZ(-Math.PI / 120);
  const rotY = Transform.rotationY(-Math.PI / 240);
  const rotX = Transform.rotationX(-Math.PI / 360);
  const mtrX = Transform.translation(6, 0, 0);

  const [mouseHandlers, viewHandlers] = WebGPU.getOrbitHandlers(gpu);
  gpu.captureMouseMotion(mouseHandlers);
  gpu.beginRenderLoop({
    camera: viewHandlers,
    lights: {
      posLights: (lights: WebGPU.PointLight[]) => {
        lights[0].pos = lights[0].pos.map(rotX);
        lights[1].pos = lights[1].pos.map(rotX).map(rotY);
        lights[2].pos = lights[2].pos.map(rotZ).map(rotX).map(rotZ);
        lights[3].pos = lights[3].pos.map(rotX).map(rotY).map(rotZ).map(rotY.invert());
      },
    },
    models: {
      'cube-1': (_t: Transform) => {
        t++;
        mrotZ = Transform.rotationZ(t * mRotZStep);
        mrotX = Transform.rotationX(t * mRotXStep);
        return mrotX.compose(mtrX).compose(mrotZ);
      },
      'cyl-1': (_t: Transform) => mrotX.compose(mtrX.invert()).compose(mrotZ),
    },
  });
  return gpu;
};
