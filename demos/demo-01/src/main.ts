import { Frame } from '@shaders-mono/geopro';
import { WebGPU } from '@shaders-mono/webgpu';
import './style.css';

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

WebGPU.initialize(canvasEl!)
  .then((gpu) => {
    gpu.setupShaders('standard-3d');
  })
  .then(() => {
    supportEl!.innerText = 'All set!';
  })
  .catch((e: Error) => {
    supportEl!.innerText = e.message;
  });
