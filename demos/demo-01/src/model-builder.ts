import { Point, Transform, UnitVector } from '@shaders-mono/geopro';
import { Gpu, createTextureMaterial, Scene, getOrbitHandlers } from '@shaders-mono/webgpu';
import * as WebGPU from '@shaders-mono/webgpu';
import { buildLights } from './lights';

export const buildGlobe = (texture: WebGPU.Material): Scene => {
  const sphere = WebGPU.sphereTriMesh()(Transform.scale(1.5, 1.5, 1.5), {
    id: 'earth-sphere',
    steps: 6,
    textureIndexes: [0],
  });
  sphere.setMaterial(texture);
  return [sphere];
};

export const buildCylinder = (texture: WebGPU.Material): Scene => {
  const cyl = WebGPU.cylinderTriMesh()(Transform.scale(2, 2, 2), {
    id: 'cylinder',
    steps: 24,
    // colors: [[0.6, 0.6, 0.6, 1.0]],
    textureIndexes: [0],
  });
  cyl.setMaterial(texture);
  return [cyl];
};

export const buildCube = (texture: WebGPU.Material): Scene => {
  const cyl = WebGPU.cubeTriMesh()(Transform.scale(2, 2, 2), {
    id: 'cube',
    // colors: [[0.0, 0.0, 1.0, 1.0]],
    textureIndexes: [0],
  });
  cyl.setMaterial(texture);
  return [cyl];
};

export const buildScene = (): Scene => {
  const refGrid = WebGPU.planeGridLines()(Transform.scale(50, 50, 1).translation(0, 0, 0), {
    id: 'ref-plane',
    steps: 50,
    colors: [[0.3, 0.3, 0.5, 0.4]],
  });

  return [refGrid];
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

  const lightsPosAnim = buildLights(gpu);

  gpu.beginRenderLoop({
    camera: viewHandlers,
    lights: lightsPosAnim,
  });

  const scene = await buildScene();

  gpu.setScene(scene);
  return gpu;
}
