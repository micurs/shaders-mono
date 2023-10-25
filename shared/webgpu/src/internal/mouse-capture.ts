import { MouseCbs, MouseDirection, MouseLocation } from '../types';

export const initMouseHandler = (canvas: HTMLCanvasElement, mouse: Required<MouseCbs>) => {
  let buttonPressed = -1;
  let origin: MouseLocation = [0.0, 0.0];
  let direction: MouseDirection = [0.0, 0.0];
  let pos: MouseLocation = [0.0, 0.0];

  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  canvas.addEventListener('wheel', (e) => {
    mouse.zoom(e.deltaY);
  });

  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    origin = [e.offsetX, e.offsetY];
    direction = [0.0, 0.0];
    pos = origin;
    buttonPressed = e.button;
    mouse.move(buttonPressed, { origin, direction }, pos);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (buttonPressed < 0) {
      return;
    }
    const newPos: MouseLocation = [e.offsetX, e.offsetY];
    direction = [newPos[0] - pos[0], newPos[1] - pos[1]];
    pos = newPos;
    mouse.move(buttonPressed, { origin, direction }, pos);
  });

  canvas.addEventListener('pointerup', (e) => {
    canvas.releasePointerCapture(e.pointerId);
    const pos: MouseLocation = [e.offsetX, e.offsetY];
    direction = [pos[0] - origin[0], pos[1] - origin[1]];
    if (direction[0] <= 0.9 && direction[1] <= 0.9) {
      mouse.click(-1, pos);
    }
    mouse.move(-1, { origin, direction }, pos);
    buttonPressed = -1;
  });
};
