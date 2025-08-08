import { Frame, Point, Transform, UnitVector, Vector, Projection, deg2rad } from '@shaders-mono/geopro';

const DARK_BG = '#0b0d12';
const GRID_COLOR = '#6b7280'; // gray-500
const WIREFRAME_COLOR = '#9ca3af'; // gray-400

type Line = [number, number, number, number];

const projectPoint = (p: Point, view: Transform, proj: Projection, widthCss: number, heightCss: number) => {
  const clip = p.map(view).map(proj);
  const ndc = proj.toNDC(clip);
  const x = (ndc.x * 0.5 + 0.5) * widthCss;
  const y = (1.0 - (ndc.y * 0.5 + 0.5)) * heightCss; // invert Y for canvas
  return { x, y };
};

const buildGridLines = (size = 10, step = 1): Line[] => {
  const lines: Line[] = [];
  const half = size / 2;
  for (let i = -half; i <= half; i += step) {
    // lines parallel to X (varying Y)
    lines.push([ -half, i, half, i ]);
    // lines parallel to Y (varying X)
    lines.push([ i, -half, i, half ]);
  }
  return lines;
};

const buildCubeEdges = (half = 1): Point[][] => {
  const c = [
    Point.fromValues(-half, -half, -half),
    Point.fromValues( half, -half, -half),
    Point.fromValues( half,  half, -half),
    Point.fromValues(-half,  half, -half),
    Point.fromValues(-half, -half,  half),
    Point.fromValues( half, -half,  half),
    Point.fromValues( half,  half,  half),
    Point.fromValues(-half,  half,  half),
  ];
  const edges = [
    [c[0], c[1]], [c[1], c[2]], [c[2], c[3]], [c[3], c[0]], // bottom
    [c[4], c[5]], [c[5], c[6]], [c[6], c[7]], [c[7], c[4]], // top
    [c[0], c[4]], [c[1], c[5]], [c[2], c[6]], [c[3], c[7]], // verticals
  ];
  return edges as Point[][];
};

const drawScene = (ctx: CanvasRenderingContext2D, time: number) => {
  const { canvas } = ctx;
  // Use CSS pixel dimensions for drawing; context is scaled to DPR elsewhere
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Camera setup: eye at (10,10,10), looking at origin
  const eye = Point.fromValues(10, 10, 10);
  const target = Point.origin();
  // Up is +Z so the XY plane is horizontal
  const up = UnitVector.fromValues(0, 0, 1);
  const view = Transform.lookAt(eye, target, up);

  const aspect = width / height;
  const proj = Projection.perspective(deg2rad(60), aspect, 0.1, 100);

  // Model transform: rotating cube around origin
  const angle = (time * 0.001) % (Math.PI * 2);
  const model = Transform.identity().rotationY(angle).rotationX(angle * 0.7);

  // Clear
  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, width, height);

  // Draw grid on XY plane (Z=0)
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (const [x1, y1, x2, y2] of buildGridLines(10, 1)) {
    const p1 = Point.fromValues(x1, y1, 0);
    const p2 = Point.fromValues(x2, y2, 0);
    const sp1 = projectPoint(p1, view, proj, width, height);
    const sp2 = projectPoint(p2, view, proj, width, height);
    ctx.moveTo(sp1.x, sp1.y);
    ctx.lineTo(sp2.x, sp2.y);
  }
  ctx.stroke();

  // Draw wireframe cube of size 2x2x2 (half=1)
  ctx.strokeStyle = WIREFRAME_COLOR;
  ctx.lineWidth = 2;
  ctx.beginPath();
  const edges = buildCubeEdges(1);
  for (const [pa, pb] of edges) {
    const a = pa.map(model);
    const b = pb.map(model);
    const sa = projectPoint(a, view, proj, width, height);
    const sb = projectPoint(b, view, proj, width, height);
    ctx.moveTo(sa.x, sa.y);
    ctx.lineTo(sb.x, sb.y);
  }
  ctx.stroke();
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

  const render = (t: number) => {
    drawScene(ctx, t);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

main();


