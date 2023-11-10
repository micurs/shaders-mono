import * as WebGPU from '@shaders-mono/webgpu';
import { buildScene } from './geo';
import { buildLights } from './lights';

export const init = async (canvas: HTMLCanvasElement) => {
  const gpu = await WebGPU.initialize(canvas);
  await gpu.setupShaders('standard-3d');

  const modelAnimHandlers = await buildScene(gpu);

  const lightsPosAnim = buildLights(gpu);

  const [mouseHandlers, viewHandlers] = WebGPU.getOrbitHandlers(gpu, [0, 0, 50]);
  gpu.captureMouseMotion(mouseHandlers);
  gpu.beginRenderLoop({
    camera: viewHandlers,
    lights: lightsPosAnim,
    models: modelAnimHandlers,
  });
  return gpu;
};
