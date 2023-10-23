import { Frame } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';
import './style.css';
import { geoBuilder } from './model-builder';
import { buildCube } from './geos';

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

  const geo = await geoBuilder(buildCube(), 'teapot');

  await gpu.setupShaders('standard-3d');

  await gpu.setupGeoBuilder(geo);

  gpu.beginRenderLoop();
}

init()
  .then(() => {
    supportEl!.innerText = 'All set!';
  })
  .catch((err) => {
    supportEl!.innerText = 'Error: ' + err.message;
  });


