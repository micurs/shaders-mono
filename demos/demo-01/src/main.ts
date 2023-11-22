import { Gpu, Material, loadTextures } from '@shaders-mono/webgpu';
import { buildCube, buildCylinder, buildGlobe, buildScene, init } from './model-builder';

const textures: Material[] = [];

const getOnClickHandler = (gpu: Gpu, checkbox: HTMLInputElement) => {
  return () => {
    console.log('setWireframe', checkbox.checked);
    if (checkbox.checked) {
      gpu.setPipelineMode('alternative');
    } else {
      gpu.setPipelineMode('default');
    }
  };
};

const getGeoClickHandler = (gpu: Gpu, geo: 'globe' | 'cylinder' | 'cube') => {
  return () => {
    gpu.clearScene();
    const refPlane = buildScene();
    switch (geo) {
      case 'globe':
        const globe = buildGlobe(textures[0]);
        gpu.setScene([...globe, ...refPlane]);
        break;
      case 'cylinder':
        const cylinder = buildCylinder(textures[1]);
        gpu.setScene([...cylinder, ...refPlane]);
        break;
      case 'cube':
        const cube = buildCube(textures[2]);
        gpu.setScene([...cube, ...refPlane]);
        break;
    }
  };
};

const supportEl = document.getElementById('support') as HTMLParagraphElement | null;
const canvasEl = document.getElementById('gfx-canvas') as HTMLCanvasElement | null;
if (!supportEl || !canvasEl) {
  alert('The app is broken! No canvas was found!');
} else {
  init(canvasEl, supportEl)
    .then((gpu) => loadTextures(gpu, ['earth.jpg', 'metal.jpg', 'dice.png']))
    .then(([gpu, textureMaterials]) => {
      textures.push(...textureMaterials);
      const checkbox = document.getElementById('wireframe') as HTMLInputElement;
      checkbox.onclick = getOnClickHandler(gpu, checkbox);

      const globeRadio = document.getElementById('geo-globe') as HTMLInputElement;
      const cylinderRadio = document.getElementById('geo-cylinder') as HTMLInputElement;
      const cubeRadio = document.getElementById('geo-cube') as HTMLInputElement;
      globeRadio.onclick = getGeoClickHandler(gpu, 'globe');
      cylinderRadio.onclick = getGeoClickHandler(gpu, 'cylinder');
      cubeRadio.onclick = getGeoClickHandler(gpu, 'cube');

      globeRadio.click();
      supportEl!.innerText = 'All set!';
    })
    .catch((err) => {
      supportEl!.innerText = 'Error: ' + err.message;
    });
}
