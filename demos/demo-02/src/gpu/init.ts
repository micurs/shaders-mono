import * as WebGPU from '@shaders-mono/webgpu';
import type {
  Material,
  TriangleData,
  TriangleMesh,
} from '@shaders-mono/webgpu';

const geoBuilder = async (trimesh: TriangleData) => {
  return (gpu: WebGPU.Gpu): [TriangleMesh, Material?] => {
    const triangleMesh = WebGPU.createTriangleMesh(gpu, trimesh);
    return [triangleMesh];
  };
};

export const init = async (canvas: HTMLCanvasElement) => {
  const gpu = await WebGPU.initialize(canvas);
  await gpu.setupShaders('standard-3d');

  const geo = await geoBuilder(WebGPU.cylinderTriMesh());
  await gpu.setupGeoBuilder(geo);

  const [mouseHandlers, viewHandlers] = WebGPU.getOrbitHandlers(gpu);
  gpu.captureMouseMotion(mouseHandlers);
  gpu.beginRenderLoop(viewHandlers);
  return gpu;
};
