import './style.css';
import { Frame } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';
import { geoBuilder } from './model-builder';
import { MouseLocation } from '@shaders-mono/webgpu';
import { getOrbitHandlers } from '@shaders-mono/webgpu';

const f = Frame.world();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Hello WebGPU!</h2>
    <div class="main">
      <div class="left">
        <h3>Controls</h3>
        <ul>
          <li>Left mouse button: rotate</li>
          <li>Center mouse button: pan</li>
          <li>Right mouse button: zoom</li>
          <li>Mouse wheel: dolly</li>
        </ul>
      </div>
      <div class="right">
        <canvas id="gfx-canvas" width="800" height="600"></canvas>
      </div>
    </div>
    <p id="support">Initializing...</p>
`;

const supportEl = document.getElementById('support') as HTMLParagraphElement | null;
const canvasEl = document.getElementById('gfx-canvas') as HTMLCanvasElement | null;

if (!supportEl || !canvasEl) {
  alert('The app is broken! No canvas was found!');
}

async function init() {
  const gpu = await WebGPU.initialize(canvasEl!);

  await gpu.setupShaders('standard-3d');

  const geo = await geoBuilder(WebGPU.cubeTriMesh(), 'teapot');
  await gpu.setupGeoBuilder(geo);

  const [mouseHandlers, viewHandlers] = getOrbitHandlers(gpu);

  gpu.captureMouseMotion({
    click: (bt: number, p: MouseLocation) => {
      supportEl!.innerText = `DEMO Mouse click: ${bt},  ${p} `;
    },
    ...mouseHandlers,
  });

  gpu.beginRenderLoop({
    ...viewHandlers,
  });
}

init()
  .then(() => {
    supportEl!.innerText = 'All set!';
  })
  .catch((err) => {
    supportEl!.innerText = 'Error: ' + err.message;
  });
