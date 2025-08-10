import { Point, Transform, UnitVector, Projection, deg2rad } from '@shaders-mono/geopro';
import {
  DARK_BG,
  GRID_COLOR,
  WIREFRAME_COLOR,
  buildCubePolygons,
  drawGrid,
  drawWireframe,
  fillPolys,
  mapPolygons,
  partitionFaces,
  projectPolygonsToScreen,
  darkenHex,
} from './util';

type RenderMode = 'wireframe' | 'filled';

// Camera orbit config (around Z axis)
const BASE_EYE = { x: 7, y: 3, z: 5 };
const EYE_RADIUS = Math.hypot(BASE_EYE.x, BASE_EYE.y);
const EYE_BASE_ANGLE = Math.atan2(BASE_EYE.y, BASE_EYE.x);
const EYE_ANGULAR_SPEED = 0.0002; // radians per ms (slow)

const drawScene = (ctx: CanvasRenderingContext2D, time: number, mode: RenderMode) => {
  const { canvas } = ctx;
  // Use CSS pixel dimensions for drawing; context is scaled to DPR elsewhere
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Camera setup: orbit eye around Z with slow rotation
  const eyeAngle = EYE_BASE_ANGLE + time * EYE_ANGULAR_SPEED;
  const eye = Point.fromValues(EYE_RADIUS * Math.cos(eyeAngle), EYE_RADIUS * Math.sin(eyeAngle), BASE_EYE.z);
  const target = Point.fromValues(0, 0, -2);
  // Up is +Z so the XY plane is horizontal
  const up = UnitVector.fromValues(0, 0, 1);
  const view = Transform.lookAt(eye, target, up);

  const aspect = width / height;
  const proj = Projection.perspective(deg2rad(75), aspect, 0.1, 100);

  // Model transform: rotating cube around origin
  // Let angle grow continuously for seamless rotation (no modulo reset)
  const angle = time * 0.001;
  const model = Transform.identity()
    .rotationY(angle)
    .rotationX(angle * 0.3);

  // Clear
  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, width, height);

  // Draw grid on XY plane (Z=0)
  drawGrid(ctx, view, proj, width, height, GRID_COLOR, 10, 1);

  // Draw wireframe cube of size 2x2x2 (half=1)
  const cubePolys = buildCubePolygons(1);
  const cubeWorld = mapPolygons(cubePolys, model);
  // Partition faces into front and back, render backfaces darker
  const { front, back } = partitionFaces(cubeWorld, eye);
  const backScreen = projectPolygonsToScreen(back, view, proj, width, height);
  const frontScreen = projectPolygonsToScreen(front, view, proj, width, height);
  if (mode === 'wireframe') {
    drawWireframe(ctx, backScreen, darkenHex(WIREFRAME_COLOR, 0.5), 2);
    drawWireframe(ctx, frontScreen, WIREFRAME_COLOR, 2);
  } else {
    // filled mode: fill front faces, do not render backfaces
    fillPolys(ctx, frontScreen, DARK_BG);
    drawWireframe(ctx, frontScreen, WIREFRAME_COLOR, 2);
  }
};

const main = () => {
  const canvas = document.getElementById('scene') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Improve sharpness on HiDPI: scale canvas to devicePixelRatio and draw in CSS pixel units
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    canvas.width = Math.floor(clientWidth * dpr);
    canvas.height = Math.floor(clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const modeSel = document.getElementById('modeSelect') as HTMLSelectElement;
  let mode: RenderMode = (modeSel?.value as RenderMode) || 'wireframe';
  modeSel?.addEventListener('change', () => {
    mode = (modeSel.value as RenderMode) || 'wireframe';
  });

  const render = (t: number) => {
    drawScene(ctx, t, mode);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

main();
