import { Gpu, createTexture, createTriangleMesh, TriangleData, TriangleMesh, Material } from '@shaders-mono/webgpu';

export const geoBuilder = async (trimesh: TriangleData, imageId: string) => {
  const textureEl = document.getElementById(imageId) as HTMLImageElement;
  const image = await createImageBitmap(textureEl);

  return (gpu: Gpu): [TriangleMesh, Material] => {
    const material = createTexture(gpu, image);
    const triangleMesh = createTriangleMesh(gpu, trimesh);
    return [triangleMesh, material];
  };
};
