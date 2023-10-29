import * as WebGPU from '@shaders-mono/webgpu';
import type { Gpu, TriangleData, Scene } from '@shaders-mono/webgpu';

const buldScene = async (gpu: Gpu, trimesh: TriangleData): Promise<Scene> => {
  trimesh.buildGpuBuffer(gpu);
  // trimesh.color = WebGPU.styleColorToVec(window.getComputedStyle(gpu.canvas).color);
  return [[trimesh]];
};

export const init = async (canvas: HTMLCanvasElement) => {
  const gpu = await WebGPU.initialize(canvas);
  await gpu.setupShaders('standard-3d');

  const color = WebGPU.styleColorToVec(window.getComputedStyle(gpu.canvas).color);
  const scene = await buldScene(gpu, WebGPU.sphereTriMesh(3, color));
  await gpu.setupGeoBuilder(scene);

  const [mouseHandlers, viewHandlers] = WebGPU.getOrbitHandlers(gpu);
  gpu.captureMouseMotion(mouseHandlers);
  gpu.beginRenderLoop(viewHandlers);
  return gpu;
};
