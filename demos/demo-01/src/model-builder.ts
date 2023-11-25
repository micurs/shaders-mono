import { Transform } from '@shaders-mono/geopro';
import { Scene, getOrbitHandlers } from '@shaders-mono/webgpu';
import * as WebGPU from '@shaders-mono/webgpu';
import { buildLights } from './lights';
import { buildModelAnim } from './model-anim';

export const buildGlobe = (earthTexture: WebGPU.Material, cloudsTexture: WebGPU.Material): Scene => {
  const earth = WebGPU.sphereTriMesh()(Transform.scale(1.5, 1.5, 1.5), {
    id: 'earth-sphere',
    steps: 4,
    colors: [[0.5, 0.5, 0.5, 1.0]],
    textureCoordinates: true,
  });
  earth.setMaterial(earthTexture);
  const clouds = WebGPU.sphereTriMesh()(Transform.scale(1.502, 1.502, 1.502), {
    id: 'earth-clouds',
    steps: 4,
    colors: [[0.5, 0.5, 0.5, 1.0]],
    textureCoordinates: true,
  });
  clouds.setMaterial(cloudsTexture);

  return [earth, clouds];
};

export const buildCylinder = (texture: WebGPU.Material): Scene => {
  const cyl = WebGPU.cylinderTriMesh()(Transform.scale(2, 2, 2), {
    id: 'cylinder',
    steps: 24,
    colors: [[1.0, 0.0, 0.0, 1.0]],
    textureCoordinates: true,
  });
  cyl.setMaterial(texture);
  return [cyl];
};

export const buildCube = (texture: WebGPU.Material): Scene => {
  const cyl = WebGPU.cubeTriMesh()(Transform.scale(2, 2, 2), {
    id: 'cube',
    textureCoordinates: true,
  });
  cyl.setMaterial(texture);
  return [cyl];
};

export const buildGrid = (): Scene => {
  const refGrid = WebGPU.planeGridLines()(Transform.scale(100, 100, 1).translation(0, 0, 0), {
    id: 'ref-plane',
    colors: [[0.2, 0.2, 0.3, 0.4]],
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
  const modelAnimHandlers = buildModelAnim(gpu);

  gpu.beginRenderLoop({
    camera: viewHandlers,
    lights: lightsPosAnim,
    models: modelAnimHandlers,
  });

  const scene = await buildGrid();

  gpu.setScene(scene);
  return gpu;
}
