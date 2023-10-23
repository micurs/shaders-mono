import './style.css';
import { Frame, Point, Transform, UnitVector } from '@shaders-mono/geopro';
import * as WebGPU from '@shaders-mono/webgpu';
import { geoBuilder } from './model-builder';

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

  gpu.beginRenderLoop({
    view: (t: Transform) => {
      if (!t.isIdentity) {
        return t;
      }
      return Transform.lookAt(
        Point.fromValues(-2.0, -4.0, 2.5), // eye
        Point.fromValues(0, 0, 0), // target
        UnitVector.fromValues(0, 0, 1) // vup
      );
    },
  });
}

init()
  .then(() => {
    supportEl!.innerText = 'All set!';
  })
  .catch((err) => {
    supportEl!.innerText = 'Error: ' + err.message;
  });
