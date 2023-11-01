import { init } from './model-builder';
import './style.css';

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
} else {
  init(canvasEl, supportEl)
    .then(() => {
      supportEl!.innerText = 'All set!';
    })
    .catch((err) => {
      supportEl!.innerText = 'Error: ' + err.message;
    });
}
