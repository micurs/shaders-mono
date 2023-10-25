import './style.css';
import { Frame, Point, Transform, UnitVector } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';
import { geoBuilder } from './model-builder';
import { MouseLocation } from '@shaders-mono/webgpu';
import { getOrbitHandlers } from '@shaders-mono/webgpu';

const f = Frame.world();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Hello Vite! We have a ${f.o}</h2>
    <canvas id="gfx-canvas" width="800" height="600"></canvas>
    <p id="support">Initializing...</p>
  </div>
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

  const [mouseHandler, zoomHandler, viewHandler] = getOrbitHandlers(gpu);

  gpu.captureMouseMotion({
    click: (bt: number, p: MouseLocation) => {
      supportEl!.innerText = `DEMO Mouse click: ${bt},  ${p} `;
    },
    move: mouseHandler,
    zoom: zoomHandler,
  });

  gpu.beginRenderLoop({
    view: viewHandler,
  });
}

init()
  .then(() => {
    supportEl!.innerText = 'All set!';
  })
  .catch((err) => {
    supportEl!.innerText = 'Error: ' + err.message;
  });
