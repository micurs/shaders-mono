import { Transform, deg2rad } from '@shaders-mono/geopro';
import { Scene, getOrbitHandlers } from '@shaders-mono/webgpu';
import * as WebGPU from '@shaders-mono/webgpu';
import { buildLights } from './lights';
import { buildModelAnim } from './model-anim';

interface SceneOptions {
  textures: WebGPU.Material[];
  globeTextures: WebGPU.Material[];
  showGrid: boolean;
}

export const sceneOptions: SceneOptions = {
  textures: [],
  globeTextures: [],
  showGrid: false,
};

export const buildGlobe = (globeTextures: WebGPU.Material[]): Scene => {
  const earth = WebGPU.sphereTriMesh()(Transform.scale(2.5, 2.5, 2.48), {
    id: 'earth-sphere',
    steps: 5,
    colors: [[0.3, 0.4, 0.7, 1.0]],
    textureCoordinates: true,
  });
  earth.addMaterial(globeTextures[0]);
  // earth.addMaterial(globeTextures[1]);

  const clouds = WebGPU.sphereTriMesh()(Transform.scale(2.53, 2.53, 2.53), {
    id: 'earth-clouds',
    steps: 4,
    colors: [[1.0, 1.0, 1.0, 0.0]],
    textureCoordinates: true,
  });
  clouds.addMaterial(globeTextures[1]);
  // clouds.addMaterial(globeTextures[3]);

  return [earth, clouds];
};

export const buildCylinder = (texture: WebGPU.Material[]): Scene => {
  const cyl = WebGPU.cylinderTriMesh()(Transform.scale(3, 3, 4), {
    id: 'cylinder',
    steps: 36,
    colors: [[0.6, 0.6, 0.5, 1.0]],
    textureCoordinates: true,
    textureAlpha: 0.8,
  });
  cyl.addMaterial(texture[0]);
  return [cyl];
};

export const buildCube = (textures: WebGPU.Material[]): Scene => {
  const cyl = WebGPU.cubeTriMesh()(Transform.scale(2, 2, 2), {
    id: 'cube',
    textureCoordinates: true,
  });
  cyl.addMaterial(textures[1]);
  return [cyl];
};

export const buildCone = (textures: WebGPU.Material[]): Scene => {
  const cone = WebGPU.coneTriMesh()(Transform.scale(3, 3, 4.0).translation(0, 0, 1), {
    id: 'cone',
    steps: 48,
    height: 0.8,
    textureCoordinates: true,
    colors: [[0.58, 0.83, 0.56, 1.0]],
    textureAlpha: 0.8,
  });
  cone.addMaterial(textures[3]);
  return [cone];
};

export const buildPlane = (textures: WebGPU.Material[]): Scene => {
  const plane = WebGPU.planeTriMesh()(Transform.scale(4, 4, 1).rotationY(deg2rad(75)), {
    id: 'plane',
    steps: 12,
    textureCoordinates: true,
    colors: [[0.4, 0.4, 0.4, 1.0]],
    textureAlpha: 1.0,
  });
  plane.addMaterial(textures[2]);
  return [plane];
};

export const buildGrid = (): Scene => {
  const refGrid = WebGPU.planeGridLines()(Transform.scale(180, 180, 1).translation(0, 0, 0), {
    id: 'ref-plane',
    colors: [[0.2, 0.2, 0.3, 0.4]],
    showAxes: true,
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

export const selectGeoToRender = (gpu: WebGPU.Gpu, geo: 'globe' | 'cylinder' | 'cube' | 'cone' | 'plane') => {
  return () => {
    gpu.getScene().forEach((g) => (g.display = 'none'));
    gpu.get('ref-plane')[0].display = sceneOptions.showGrid ? 'full' : 'none';
    switch (geo) {
      case 'plane':
        const planeScene = gpu.get('plane');
        if (planeScene.length > 0) {
          planeScene.forEach((g) => (g.display = 'full'));
        } else {
          const newPlane = buildPlane(sceneOptions.textures);
          gpu.addToScene(newPlane);
        }
        break;
      case 'globe':
        const globeScene = gpu.get('earth-sphere', 'earth-clouds');
        if (globeScene.length > 0) {
          globeScene.forEach((g) => (g.display = 'full'));
        } else {
          const newGlobe = buildGlobe(sceneOptions.globeTextures);
          gpu.addToScene(newGlobe);
        }
        break;
      case 'cylinder':
        const cylinderScene = gpu.get('cylinder');
        if (cylinderScene.length > 0) {
          cylinderScene.forEach((g) => (g.display = 'full'));
        } else {
          const newCylinder = buildCylinder(sceneOptions.textures);
          gpu.addToScene(newCylinder);
        }
        break;
      case 'cone':
        const coneScene = gpu.get('cone');
        if (coneScene.length > 0) {
          coneScene.forEach((g) => (g.display = 'full'));
        } else {
          const newCone = buildCone(sceneOptions.textures);
          gpu.addToScene(newCone);
        }
        break;
      case 'cube':
        const cubeScene = gpu.get('cube');
        if (cubeScene.length > 0) {
          cubeScene.forEach((g) => (g.display = 'full'));
        } else {
          const newCube = buildCube(sceneOptions.textures);
          gpu.addToScene(newCube);
        }
        break;
    }
  };
};
