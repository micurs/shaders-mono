# GeoPro


## Projection (perspective and orthographic)

`Projection` provides perspective and orthographic projection matrices that plug into the same pipeline as `Transform`/`Frame`. It participates in the same `GeoMap` workflow, so you can compose it and map `Point`, `Vector`, `UnitVector`, and `Ray` just like with `Transform`.

### Import

```ts
import { Projection, Transform, Frame, Point, UnitVector, deg2rad } from '@shaders-mono/geopro';
```

### Create a perspective projection

```ts
const aspect = canvas.width / canvas.height;
const proj = Projection.perspective(deg2rad(60), aspect, 0.1, 100);

// Typical camera/view transform
const eye = Point.fromValues(0, 2, 5);
const target = Point.fromValues(0, 0, 0);
const up = UnitVector.fromValues(0, 1, 0);
const view = Transform.lookAt(eye, target, up);

// World -> View -> Clip
const pWorld = Point.fromValues(1, 1, -3);
const pClip = pWorld.map(view).map(proj);
```

Note: mapping does not automatically perform the perspective divide (divide-by-w). If you need Normalized Device Coordinates (NDC), use the helper:

```ts
const pNdc = proj.toNDC(pClip); // returns a Point in NDC
```

### Create an orthographic projection

```ts
const ortho = Projection.orthographic(-2, 2, -1, 1, 0.1, 100);
const pClipOrtho = pWorld.map(ortho);
```

### Composition

`Projection` composes like `Transform`. The composition order matches the library’s current semantics (`right · left`).

```ts
const viewProj = view.compose(proj);       // GeoMap composition
const pClip2 = pWorld.map(viewProj);
```

You can also compose projections together:

```ts
const pCombined = proj.compose(ortho);
```

### Inversion and round-trips

All projections are invertible within the library’s numeric constraints:

```ts
const invProj = proj.invert();
const pBack = pClip.map(invProj); // approximately pWorld (no perspective divide)
```

### Interop summary

- Works with `Point`, `Vector`, `UnitVector`, and `Ray` via `.map()` / `.unMap()`
- Composable with `Transform` and `Frame`
- Use `Projection.toNDC(point)` when you explicitly need divide-by-w

