import { Gpu, createTexture, TriangleData, Scene, MouseLocation, getOrbitHandlers } from '@shaders-mono/webgpu';
import * as WebGPU from '@shaders-mono/webgpu';

export const buildScene = async (gpu: Gpu, trimesh: TriangleData, imageId: string): Promise<Scene> => {
  const textureEl = document.getElementById(imageId) as HTMLImageElement;
  const image = await createImageBitmap(textureEl);

  const material = createTexture(gpu, image);
  trimesh.buildGpuBuffer(gpu);
  return [[trimesh, material]];
};

export async function init(canvasEl: HTMLCanvasElement, supportEl: HTMLParagraphElement) {
  const gpu = await WebGPU.initialize(canvasEl);

  await gpu.setupShaders('standard-3d');

  const scene = await buildScene(gpu, WebGPU.cubeTriMesh(), 'teapot');
  await gpu.setupGeoBuilder(scene);

  const [mouseHandlers, viewHandlers] = getOrbitHandlers(gpu);

  gpu.captureMouseMotion({
    click: (bt: number, p: MouseLocation) => {
      supportEl.innerText = `DEMO Mouse click: ${bt},  ${p} `;
    },
    ...mouseHandlers,
  });

  gpu.beginRenderLoop({
    ...viewHandlers,
  });
}
