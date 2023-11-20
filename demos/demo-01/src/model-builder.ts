import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { Gpu, createTextureMaterial, Scene, getOrbitHandlers } from '@shaders-mono/webgpu';
import * as WebGPU from '@shaders-mono/webgpu';

export const buildScene = async (gpu: Gpu, imageId: string): Promise<Scene> => {
  const sphere = WebGPU.sphereTriMesh()(Transform.scale(1.5, 1.5, 1.5), {
    id: 'hearth-sphere',
    steps: 6,
  });

  const refGrid = WebGPU.planeGridLines()(Transform.scale(50, 50, 1).translation(0, 0, 0), {
    id: 'ref-plane',
    steps: 50,
    color: [0.4, 0.4, 0.6, 0.1],
  });

  const textureEl = document.getElementById(imageId) as HTMLImageElement;
  const image = await createImageBitmap(textureEl);

  const material = createTextureMaterial(gpu, image);
  // cube.setMaterial(material);
  sphere.setMaterial(material);

  return [sphere, refGrid];
};

/**
 *
 * @param canvasEl
 * @param supportEl
 */
export async function init(canvasEl: HTMLCanvasElement, _supportEl: HTMLParagraphElement) {
  const gpu = await WebGPU.initialize(canvasEl);

  await gpu.setupShaders('standard-3d');

  const [mouseHandlers, viewHandlers] = getOrbitHandlers(gpu, [6, 6, 4]);
  gpu.captureMouseMotion(mouseHandlers);
  gpu.beginRenderLoop({
    camera: viewHandlers,
  });

  const scene = await buildScene(gpu, 'earth2');

  gpu.setAmbientLight([0.05, 0.05, 0.05, 1.0]);
  gpu.setLight('directional', 0, { dir: UnitVector.fromValues(1.0, -1.0, 0.0), col: [0.5, 0.5, 0.5, 1.0] });

  gpu.setLight('point', 0, { pos: Point.fromValues(0.0, 0.0, 5), col: [0.55, 0.25, 0.25, 0.0] });
  gpu.setLight('point', 1, { pos: Point.fromValues(0.0, 0.0, 5), col: [0.1, 0.4, 0.8, 0.0] });
  gpu.setLight('point', 2, { pos: Point.fromValues(-6.0, 4.0, 4.5), col: [0.0, 0.1, 0.4, 1.0] });
  gpu.setLight('point', 3, { pos: Point.fromValues(-6.0, 14.0, 8.5), col: [0.2, 0.5, 0.0, 0.0] });

  gpu.setScene(scene);
  return gpu;
}
