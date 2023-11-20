import { Gpu } from '@shaders-mono/webgpu';
import { init } from './model-builder';

const getOnClickHandler = (gpu: Gpu, checkbox: HTMLInputElement) => {
  return () => {
    console.log('setWireframe', checkbox.checked);
    if (checkbox.checked) {
      gpu.setPipelineMode('alternative');
    } else {
      gpu.setPipelineMode('default');
    }
  };
};

const image = new Image();
image.src = 'earth.jpg';
image.onload = () => {
  const supportEl = document.getElementById('support') as HTMLParagraphElement | null;
  const canvasEl = document.getElementById('gfx-canvas') as HTMLCanvasElement | null;
  if (!supportEl || !canvasEl) {
    alert('The app is broken! No canvas was found!');
    return;
  }
  createImageBitmap(image)
    .then((texture) => init(canvasEl, supportEl, texture))
    .then((gpu) => {
      const checkbox = document.getElementById('wireframe') as HTMLInputElement;
      checkbox.onclick = getOnClickHandler(gpu, checkbox);
      supportEl!.innerText = 'All set!';
    })
    .catch((err) => {
      supportEl!.innerText = 'Error: ' + err.message;
    });
};
