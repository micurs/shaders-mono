import { Gpu, loadTextures } from '@shaders-mono/webgpu';
import { init, selectGeoToRender, sceneOptions } from './model-builder';

const getWireframeHandler = (gpu: Gpu, checkbox: HTMLInputElement) => {
  return () => {
    console.log('setWireframe', checkbox.checked);
    if (checkbox.checked) {
      gpu.setPipelineMode('alternative');
    } else {
      gpu.setPipelineMode('default');
    }
  };
};

const getGridHandler = (gpu: Gpu, checkbox: HTMLInputElement) => {
  return () => {
    console.log('setGrid', checkbox.checked);
    sceneOptions.showGrid = checkbox.checked;
    gpu.get('ref-plane')[0].display = sceneOptions.showGrid ? 'full' : 'none';
  };
};

const supportEl = document.getElementById('support') as HTMLParagraphElement | null;
const canvasEl = document.getElementById('gfx-canvas') as HTMLCanvasElement | null;
const fpsEl = document.getElementById('fps') as HTMLCanvasElement | null;

if (!supportEl || !canvasEl) {
  alert('The app is broken! No canvas was found!');
} else {
  init(canvasEl, supportEl)
    .then((gpu) => {
      supportEl!.innerText = 'Loading textures...';
      return loadTextures(gpu, ['earth.jpg', 'clouds-4k.png', 'earth-bump-4k.png']);
    })
    .then(([gpu, textureMaterials]) => {
      sceneOptions.globeTextures.push(...textureMaterials);
      supportEl!.innerText = 'Almost there...';

      return gpu;
    })
    .then((gpu) => loadTextures(gpu, ['metal2.jpg', 'dice.png']))
    .then(([gpu, textureMaterials]) => {
      sceneOptions.textures.push(...textureMaterials);
      const wireframeCheck = document.getElementById('wireframe') as HTMLInputElement;
      wireframeCheck.onclick = getWireframeHandler(gpu, wireframeCheck);

      const gridCheck = document.getElementById('grid') as HTMLInputElement;
      gridCheck.onclick = getGridHandler(gpu, gridCheck);

      const globeRadio = document.getElementById('geo-globe') as HTMLInputElement;
      const cylinderRadio = document.getElementById('geo-cylinder') as HTMLInputElement;
      const cubeRadio = document.getElementById('geo-cube') as HTMLInputElement;
      globeRadio.onclick = selectGeoToRender(gpu, 'globe');
      cylinderRadio.onclick = selectGeoToRender(gpu, 'cylinder');
      cubeRadio.onclick = selectGeoToRender(gpu, 'cube');

      globeRadio.click();
      supportEl!.innerText = 'All set!';
      supportEl!.style.opacity = '0';
      fpsEl!.style.opacity = '1';
      fpsEl!.style.width = '160px';

      setInterval(() => {
        supportEl!.style.display = 'none';
        fpsEl!.innerText = `FPS: ${gpu.fps.toFixed(0)}`;
      }, 2000);
    })
    .catch((err) => {
      supportEl!.innerText = 'Error: ' + err.message;
    });
}
