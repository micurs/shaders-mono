import { Transform } from '@shaders-mono/geopro';
import { Gpu, createTexture, Scene, getOrbitHandlers } from '@shaders-mono/webgpu';
import * as WebGPU from '@shaders-mono/webgpu';

export const buildScene = async (gpu: Gpu, trimesh: WebGPU.GeoRenderable, imageId: string): Promise<Scene> => {
  const refGrid = WebGPU.planeGridLines()(Transform.scale(10, 10, 1).translation(0, 0, 0), {
    id: 'ref-plane',
    steps: 10,
    color: [0.6, 0.6, 1.0, 0.2],
  });

  const textureEl = document.getElementById(imageId) as HTMLImageElement;
  const image = await createImageBitmap(textureEl);

  console.log('image', imageId, image.width, image.height);
  debugger;
  const material = createTexture(gpu, image);
  return [[trimesh, material], [refGrid]];
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

  const scene = await buildScene(
    gpu,
    WebGPU.cubeTriMesh()(Transform.scale(1.5, 1.5, 1.5), {
      id: 'teapot-cube',
      // color: [0.6, 0.6, 1.0, 1.0],
    }),
    'teapot'
  );
  await gpu.setScene(scene);
}
