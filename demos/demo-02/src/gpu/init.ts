import { Transform } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';
import type { Gpu, Scene } from '@shaders-mono/webgpu';

const buildScene = async (gpu: Gpu): Promise<Scene> => {
  const color1: WebGPU.RGBAColor = [0.8, 0.8, 0.8, 1.0]; // WebGPU.styleColorToVec(window.getComputedStyle(gpu.canvas).color);
  const color2: WebGPU.RGBAColor = [0.5, 0.5, 1.0, 1.0];
  const color3: WebGPU.RGBAColor = [0.8, 0.3, 1.0, 1.0];

  const cube = WebGPU.cubeTriMesh(
    Transform.rotationX(Math.PI / 3)
      .rotationZ(Math.PI * 0.2)
      .translation(-1.6, 0, 0),
    color3
  );
  const cylinder = WebGPU.cylinderTriMesh(12, color2, Transform.rotationY(Math.PI * 0.7).translation(1.6, 0, 0));
  const sphere = WebGPU.sphereTriMesh(3, color1, Transform.scale(1.5, 1.5, 1.5));
  sphere.buildGpuBuffer(gpu);
  cylinder.buildGpuBuffer(gpu);
  cube.buildGpuBuffer(gpu);

  return [[cube], [sphere], [cylinder]];
};

export const init = async (canvas: HTMLCanvasElement) => {
  const gpu = await WebGPU.initialize(canvas);
  await gpu.setupShaders('standard-3d');

  const scene = await buildScene(gpu);
  await gpu.setupGeoBuilder(scene);

  const [mouseHandlers, viewHandlers] = WebGPU.getOrbitHandlers(gpu);
  gpu.captureMouseMotion(mouseHandlers);
  gpu.beginRenderLoop(viewHandlers);
  return gpu;
};
