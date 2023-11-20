import { init } from './model-builder';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Hello World!</h2>
    <div class="main">
      <div class="left">
        <h3>Camera control test</h3>
        <p>Click and move the mouse to rotate the camera.</p>
        <h3>Controls</h3>
        <ul>
          <li>Left mouse button: rotate</li>
          <li>Center mouse button: pan</li>
          <li>Right mouse button: zoom</li>
          <li>Mouse wheel: dolly</li>
          <li>CTRL Mouse wheel: tilt</li>
        </ul>
        <div>
          <input type="checkbox" id="wireframe" onClick="setWireframe()">
          <label htmlFor="wireframe"}>WireFrame</label>
        </div>
      </div>
      <div class="right">
        <canvas id="gfx-canvas" width="800" height="600"></canvas>
      </div>
    </div>
    <p id="support">Initializing...</p>
`;

const supportEl = document.getElementById('support') as HTMLParagraphElement | null;
const canvasEl = document.getElementById('gfx-canvas') as HTMLCanvasElement | null;

setTimeout(() => {
  if (!supportEl || !canvasEl) {
    alert('The app is broken! No canvas was found!');
  } else {
    init(canvasEl, supportEl)
      .then((gpu) => {
        supportEl!.innerText = 'All set!';

        (globalThis as any).setWireframe = () => {
          const checkbox = document.getElementById('wireframe') as HTMLInputElement;
          console.log('setWireframe', checkbox.checked);
          if (checkbox.checked) {
            gpu.setPipelineMode('alternative');
          } else {
            gpu.setPipelineMode('default');
          }
        };
      })
      .catch((err) => {
        supportEl!.innerText = 'Error: ' + err.message;
      });
  }
}, 2000);
