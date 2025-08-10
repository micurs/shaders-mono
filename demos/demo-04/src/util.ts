import { Frame, Point, Transform, UnitVector, Vector, Projection } from '@shaders-mono/geopro';

/** Dark background color for the scene */
export const DARK_BG = '#0b0d12';
/** Grid line color (gray-500) */
export const GRID_COLOR = '#6b7280';
/** Wireframe object color (gray-400) */
export const WIREFRAME_COLOR = '#9ca3af';

/** Represents a line segment as [x1, y1, x2, y2] coordinates */
export type Line = [number, number, number, number];
/** Represents a polygon as an array of 3D points */
export type Polygon = Point[];
/** Represents a 2D screen point with x, y coordinates */
export type ScreenPoint = { x: number; y: number };
/** Represents a polygon in 2D screen coordinates */
export type ScreenPolygon = ScreenPoint[];

/**
 * Projects a 3D point to 2D screen coordinates through view and projection transformations.
 *
 * @param p - The 3D point in world space
 * @param view - The view transformation matrix
 * @param proj - The projection transformation
 * @param widthCss - The CSS width of the canvas
 * @param heightCss - The CSS height of the canvas
 * @returns A 2D screen point with x, y coordinates
 */
export const projectPoint = (
  p: Point,
  view: Transform,
  proj: Projection,
  widthCss: number,
  heightCss: number
) => {
  const clip = p.map(view).map(proj);
  const ndc = proj.toNDC(clip);
  const x = (ndc.x * 0.5 + 0.5) * widthCss;
  const y = (1.0 - (ndc.y * 0.5 + 0.5)) * heightCss; // invert Y for canvas
  return { x, y };
};

/**
 * Builds a grid of lines for rendering on the XY plane.
 *
 * @param size - The size of the grid (default: 10)
 * @param step - The spacing between grid lines (default: 1)
 * @returns An array of line segments representing the grid
 */
export const buildGridLines = (size = 10, step = 1): Line[] => {
  const lines: Line[] = [];
  const half = size / 2;
  for (let i = -half; i <= half; i += step) {
    // lines parallel to X (varying Y)
    lines.push([-half, i, half, i]);
    // lines parallel to Y (varying X)
    lines.push([i, -half, i, half]);
  }
  return lines;
};

/**
 * Draws a grid on the canvas using the specified view and projection transformations.
 *
 * @param ctx - The 2D canvas rendering context
 * @param view - The view transformation matrix
 * @param proj - The projection transformation
 * @param widthCss - The CSS width of the canvas
 * @param heightCss - The CSS height of the canvas
 * @param color - The color of the grid lines (default: GRID_COLOR)
 * @param size - The size of the grid (default: 10)
 * @param step - The spacing between grid lines (default: 1)
 */
export const drawGrid = (
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

/**
 * Builds a cube as a collection of polygons (faces).
 * Each face is defined as a quad with counter-clockwise vertex ordering.
 *
 * @param half - Half the size of the cube (default: 1, resulting in a 2x2x2 cube)
 * @returns An array of polygons representing the 6 faces of the cube
 */
export const buildCubePolygons = (half = 1): Polygon[] => {
  const c = [
    Point.fromValues(-half, -half, -half), // 0
    Point.fromValues(half, -half, -half), // 1
    Point.fromValues(half, half, -half), // 2
    Point.fromValues(-half, half, -half), // 3
    Point.fromValues(-half, -half, half), // 4
    Point.fromValues(half, -half, half), // 5
    Point.fromValues(half, half, half), // 6
    Point.fromValues(-half, half, half), // 7
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

/**
 * Applies a transformation to all points in a collection of polygons.
 *
 * @param polys - Array of polygons to transform
 * @param map - The transformation to apply (Transform, Frame, or Projection)
 * @returns New array of transformed polygons
 */
export const mapPolygons = (polys: Polygon[], map: Transform | Frame | Projection): Polygon[] => {
  return polys.map((poly) => poly.map((p) => p.map(map)));
};

/**
 * Calculates the center point of a polygon by averaging all vertex positions.
 *
 * @param poly - The polygon to find the center of
 * @returns The center point of the polygon
 */
export const polygonCenter = (poly: Polygon): Point => {
  const n = poly.length;
  let sx = 0,
    sy = 0,
    sz = 0;
  for (const p of poly) {
    sx += p.x;
    sy += p.y;
    sz += p.z;
  }
  return Point.fromValues(sx / n, sy / n, sz / n);
};

/**
 * Calculates the outward-facing normal vector for a polygon face.
 * Uses the first three vertices to compute the normal and ensures it points outward
 * from the object center (assumed to be near the origin).
 *
 * @param polyWorld - The polygon in world space
 * @returns A unit vector representing the outward-facing normal
 */
export const faceNormalOutward = (polyWorld: Polygon): UnitVector => {
  const p0 = polyWorld[0];
  const p1 = polyWorld[1];
  const p2 = polyWorld[2];
  const e1 = Vector.fromPoints(p1, p0); // p1 - p0
  const e2 = Vector.fromPoints(p2, p0); // p2 - p0
  let n = UnitVector.crossProduct(e1, e2); // raw normal
  // Ensure normal points outward with respect to object center (assumed near origin)
  const c = polygonCenter(polyWorld);
  const toCenter = Vector.fromPoints(Point.origin(), c); // toward object center
  if (Vector.dot(n.scale(1), toCenter) > 0) {
    n = n.invert();
  }
  return n;
};

/**
 * Partitions polygons into front-facing and back-facing groups relative to the camera eye.
 * Front-facing polygons are visible to the camera, back-facing are not.
 *
 * @param polysWorld - Array of polygons in world space
 * @param eye - The camera eye position
 * @returns Object containing arrays of front and back facing polygons
 */
export const partitionFaces = (polysWorld: Polygon[], eye: Point): { front: Polygon[]; back: Polygon[] } => {
  const front: Polygon[] = [];
  const back: Polygon[] = [];
  for (const poly of polysWorld) {
    if (poly.length < 3) continue;
    const n = faceNormalOutward(poly);
    const c = polygonCenter(poly);
    const toEye = Vector.fromPoints(eye, c); // from face center to eye
    if (Vector.dot(n.scale(1), toEye) > 0) front.push(poly);
    else back.push(poly);
  }
  return { front, back };
};

/**
 * Projects world-space polygons to 2D screen coordinates.
 *
 * Pipeline per vertex:
 * 1) world -> view (camera) -> clip (projection)
 * 2) perspective divide (clip to NDC)
 * 3) NDC [-1,1] -> screen pixels [0,width]x[0,height] with Y flipped for Canvas
 *
 * @param polys - Array of polygons in world space
 * @param view - The view transformation matrix
 * @param proj - The projection transformation
 * @param widthCss - The CSS width of the canvas
 * @param heightCss - The CSS height of the canvas
 * @returns Array of polygons in 2D screen coordinates
 */
export const projectPolygonsToScreen = (
  polys: Polygon[],
  view: Transform,
  proj: Projection,
  widthCss: number,
  heightCss: number
): ScreenPolygon[] => {
  return polys.map((poly) =>
    poly.map((p) => {
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

/**
 * Draws wireframe outlines of polygons on the canvas.
 *
 * @param ctx - The 2D canvas rendering context
 * @param screenPolys - Array of polygons in screen coordinates
 * @param color - The color of the wireframe lines
 * @param lineWidth - The width of the lines (default: 1)
 */
export const drawWireframe = (
  ctx: CanvasRenderingContext2D,
  screenPolys: ScreenPolygon[],
  color: string,
  lineWidth = 1
) => {
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

/**
 * Converts a hexadecimal color string to RGB values.
 *
 * @param hex - Hexadecimal color string (e.g., "#FF0000")
 * @returns Array of RGB values [r, g, b] in range [0, 255]
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  const m = hex.trim().replace('#', '');
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  return [r, g, b];
};

/**
 * Converts RGB values to a hexadecimal color string.
 *
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hexadecimal color string
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const to2 = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, '0');
  return `#${to2(r)}${to2(g)}${to2(b)}`;
};

/**
 * Darkens a hexadecimal color by a specified factor.
 *
 * @param hex - Hexadecimal color string to darken
 * @param factor - Darkening factor (0.0 = black, 1.0 = no change, default: 0.5)
 * @returns Darkened hexadecimal color string
 */
export const darkenHex = (hex: string, factor = 0.5): string => {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * factor, g * factor, b * factor);
};

/**
 * Fills a list of screen-space polygons with a solid color.
 * Useful for creating solid filled areas or clipping backgrounds.
 *
 * @param ctx - The 2D canvas rendering context
 * @param screenPolys - Array of polygons in screen coordinates to fill
 * @param color - The fill color
 */
export const fillPolys = (ctx: CanvasRenderingContext2D, screenPolys: ScreenPolygon[], color: string) => {
  ctx.fillStyle = color;
  for (const poly of screenPolys) {
    if (poly.length === 0) continue;
    ctx.beginPath();
    ctx.moveTo(poly[0].x, poly[0].y);
    for (let i = 1; i < poly.length; i++) {
      ctx.lineTo(poly[i].x, poly[i].y);
    }
    ctx.closePath();
    ctx.fill();
  }
};


