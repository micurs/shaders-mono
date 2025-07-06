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

const supportEl = document.getElementById('support');
const canvasEl = document.getElementById('gfx-canvas');
const fpsEl = document.getElementById('fps');

if (!supportEl || !canvasEl) {
  alert('The app is broken! No canvas was found!');
} else {
  init(canvasEl as HTMLCanvasElement, supportEl as HTMLParagraphElement)
    .then((gpu) => {
      supportEl.innerText = 'Loading textures...';
      return loadTextures(gpu, ['earth4k.jpg', 'earth4k-bump.jpg', 'earth-clouds.png']);
    })
    .then(([gpu, textureMaterials]) => {
      sceneOptions.globeTextures.push(...textureMaterials);
      supportEl.innerText = 'Almost there...';

      return gpu;
    })
    .then((gpu) => loadTextures(gpu, ['wood-2k.jpg', 'dice.png', 'water.jpg', 'metal.jpg']))
    .then(([gpu, textureMaterials]) => {
      sceneOptions.textures.push(...textureMaterials);
      const wireframeCheck = document.getElementById('wireframe') as HTMLInputElement;
      wireframeCheck.onclick = getWireframeHandler(gpu, wireframeCheck);

      const gridCheck = document.getElementById('grid') as HTMLInputElement;
      gridCheck.onclick = getGridHandler(gpu, gridCheck);

      const globeRadio = document.getElementById('geo-globe') as HTMLInputElement;
      const cylinderRadio = document.getElementById('geo-cylinder') as HTMLInputElement;
      const cubeRadio = document.getElementById('geo-cube') as HTMLInputElement;
      const coneRadio = document.getElementById('geo-cone') as HTMLInputElement;
      const planeRadio = document.getElementById('geo-plane') as HTMLInputElement;

      globeRadio.onclick = selectGeoToRender(gpu, 'globe');
      cylinderRadio.onclick = selectGeoToRender(gpu, 'cylinder');
      cubeRadio.onclick = selectGeoToRender(gpu, 'cube');
      coneRadio.onclick = selectGeoToRender(gpu, 'cone');
      planeRadio.onclick = selectGeoToRender(gpu, 'plane');

      globeRadio.click();
      supportEl.innerText = 'All set!';
      supportEl.style.opacity = '0';
      if (fpsEl) {
        fpsEl.style.opacity = '1';
        fpsEl.style.width = '160px';
      }

      setInterval(() => {
        if (supportEl) {
          supportEl.style.display = 'none';
        }
        if (fpsEl) {
          fpsEl.innerText = `FPS: ${gpu.fps.toFixed(0)}`;
        }
      }, 2000);
    })
    .catch((err) => {
      if (supportEl) {
        supportEl.innerText = 'Error: ' + (err as Error).message;
      }
    });
}
