import { init } from './model-builder';

const supportEl = document.getElementById('support') as HTMLParagraphElement | null;
const canvasEl = document.getElementById('gfx-canvas') as HTMLCanvasElement | null;
const image = new Image();
image.src = 'earth.jpg';
image.onload = () => {
  if (!supportEl || !canvasEl) {
    alert('The app is broken! No canvas was found!');
  } else {
    createImageBitmap(image)
      .then((texture) => init(canvasEl, supportEl, texture))
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
};
