import { Transform } from '@shaders-mono/geopro';
import { Gpu, createTextureMaterial, Scene, getOrbitHandlers } from '@shaders-mono/webgpu';
import * as WebGPU from '@shaders-mono/webgpu';

export const buildScene = async (gpu: Gpu, imageId: string): Promise<Scene> => {
  const cube = WebGPU.cubeTriMesh()(Transform.scale(1.5, 1.5, 1.5), {
    id: 'teapot-cube',
    // color: [0.6, 0.6, 1.0, 1.0],
  });

  const refGrid = WebGPU.planeGridLines()(Transform.scale(10, 10, 1).translation(0, 0, 0), {
    id: 'ref-plane',
    steps: 10,
    color: [0.6, 0.6, 1.0, 0.2],
  });

  const textureEl = document.getElementById(imageId) as HTMLImageElement;
  const image = await createImageBitmap(textureEl);

  const material = createTextureMaterial(gpu, image);
  cube.setMaterial(material);
  return [cube, refGrid];
};

/**
 *
 * @param canvasEl
 * @param supportEl
 */
export async function init(canvasEl: HTMLCanvasElement, _supportEl: HTMLParagraphElement) {
  const gpu = await WebGPU.initialize(canvasEl);

  await gpu.setupShaders('standard-3d');

  const [mouseHandlers, viewHandlers] = getOrbitHandlers(gpu, [3, 3, 3]);
  gpu.captureMouseMotion(mouseHandlers);
  gpu.beginRenderLoop({
    camera: viewHandlers,
  });

  const scene = await buildScene(gpu, 'teapot');

  gpu.setScene(scene);
}
