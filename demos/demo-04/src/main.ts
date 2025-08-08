import { Frame, Point, Transform, UnitVector, Vector, Projection, deg2rad } from '@shaders-mono/geopro';

const DARK_BG = '#0b0d12';
const GRID_COLOR = '#6b7280'; // gray-500
const WIREFRAME_COLOR = '#9ca3af'; // gray-400

type Line = [number, number, number, number];
type Polygon = Point[];
type ScreenPoint = { x: number; y: number };
type ScreenPolygon = ScreenPoint[];

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

const drawGrid = (
  ctx: CanvasRenderingContext2D,
  view: Transform,
  proj: Projection,
  widthCss: number,
  heightCss: number,
  color: string = GRID_COLOR,
  size = 10,
  step = 1
) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (const [x1, y1, x2, y2] of buildGridLines(size, step)) {
    const p1 = Point.fromValues(x1, y1, 0);
    const p2 = Point.fromValues(x2, y2, 0);
    const sp1 = projectPoint(p1, view, proj, widthCss, heightCss);
    const sp2 = projectPoint(p2, view, proj, widthCss, heightCss);
    ctx.moveTo(sp1.x, sp1.y);
    ctx.lineTo(sp2.x, sp2.y);
  }
  ctx.stroke();
};

const buildCubePolygons = (half = 1): Polygon[] => {
  const c = [
    Point.fromValues(-half, -half, -half), // 0
    Point.fromValues( half, -half, -half), // 1
    Point.fromValues( half,  half, -half), // 2
    Point.fromValues(-half,  half, -half), // 3
    Point.fromValues(-half, -half,  half), // 4
    Point.fromValues( half, -half,  half), // 5
    Point.fromValues( half,  half,  half), // 6
    Point.fromValues(-half,  half,  half), // 7
  ];
  // 6 faces as quads (counter-clockwise order)
  const faces: Polygon[] = [
    [c[0], c[1], c[2], c[3]], // back (-Z)
    [c[4], c[5], c[6], c[7]], // front (+Z)
    [c[0], c[4], c[7], c[3]], // left (-X)
    [c[1], c[5], c[6], c[2]], // right (+X)
    [c[3], c[2], c[6], c[7]], // top (+Y)
    [c[0], c[1], c[5], c[4]], // bottom (-Y)
  ];
  return faces;
};

const mapPolygons = (polys: Polygon[], map: Transform | Frame | Projection): Polygon[] => {
  return polys.map(poly => poly.map(p => p.map(map)));
};

/**
 * Project world-space polygons to 2D screen coordinates.
 * Pipeline per vertex:
 * 1) world -> view (camera) -> clip (projection)
 * 2) perspective divide (clip to NDC)
 * 3) NDC [-1,1] -> screen pixels [0,width]x[0,height] with Y flipped for Canvas
 */
const projectPolygonsToScreen = (
  polys: Polygon[],
  view: Transform,
  proj: Projection,
  widthCss: number,
  heightCss: number
): ScreenPolygon[] => {
  return polys.map(poly =>
    poly.map(p => {
      // world -> view -> clip space
      const clip = p.map(view).map(proj);
      // homogeneous divide to get Normalized Device Coordinates
      const ndc = proj.toNDC(clip);
      // map NDC to pixel coordinates; Canvas Y grows downward, so flip
      return {
        x: (ndc.x * 0.5 + 0.5) * widthCss,
        y: (1.0 - (ndc.y * 0.5 + 0.5)) * heightCss,
      };
    })
  );
};

const drawWireframe = (ctx: CanvasRenderingContext2D, screenPolys: ScreenPolygon[], color: string, lineWidth = 1) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (const poly of screenPolys) {
    if (poly.length === 0) continue;
    const first = poly[0];
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < poly.length; i++) {
      const p = poly[i];
      ctx.lineTo(p.x, p.y);
    }
    // close the polygon
    ctx.lineTo(first.x, first.y);
  }
  ctx.stroke();
};

const drawScene = (ctx: CanvasRenderingContext2D, time: number) => {
  const { canvas } = ctx;
  // Use CSS pixel dimensions for drawing; context is scaled to DPR elsewhere
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Camera setup: bring camera a bit closer and widen FOV for stronger perspective
  const eye = Point.fromValues(7, 3, 5);
  const target = Point.fromValues(0, 0, -2);
  // Up is +Z so the XY plane is horizontal
  const up = UnitVector.fromValues(0, 0, 1);
  const view = Transform.lookAt(eye, target, up);

  const aspect = width / height;
  const proj = Projection.perspective(deg2rad(75), aspect, 0.1, 100);

  // Model transform: rotating cube around origin
  // Let angle grow continuously for seamless rotation (no modulo reset)
  const angle = time * 0.001;
  const model = Transform.identity().rotationY(angle).rotationX(angle * 0.3);

  // Clear
  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, width, height);

  // Draw grid on XY plane (Z=0)
  drawGrid(ctx, view, proj, width, height, GRID_COLOR, 10, 1);

  // Draw wireframe cube of size 2x2x2 (half=1)
  const cubePolys = buildCubePolygons(1);
  const cubeWorld = mapPolygons(cubePolys, model);
  const cubeScreen = projectPolygonsToScreen(cubeWorld, view, proj, width, height);
  drawWireframe(ctx, cubeScreen, WIREFRAME_COLOR, 2);
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


