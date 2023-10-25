import { Frame, Point, Ray, Transform, UnitVector, Vector, rad2deg } from '@shaders-mono/geopro';
import { MouseLocation, MouseMoveHandler, MouseMovement, MouseZoomHandler, TransformHandler } from '../types';
import { Gpu } from '../gpu-connection';

export const getOrbitHandlers = (gpu: Gpu): [MouseMoveHandler, MouseZoomHandler, TransformHandler] => {
  let target = Point.fromValues(0, 0, 0);
  let eye = Point.fromValues(5.0, 5.0, 5.0);
  let vuv = UnitVector.fromValues(0, 1, 0);
  let rot = [0.0, 0.0];
  let zoom = 0.0;
  const fov = Vector.fromPoints(eye, target).length;
  let sensitivity = (1.0 / Math.max(gpu.canvas.width, gpu.canvas.height)) * fov * 2;
  let cameraFrame = Frame.lookAt(eye, target, vuv);
  let rotating = false;

  const mouseHandler = (bt: number, r: MouseMovement, _p: MouseLocation) => {
    switch (bt) {
      case 0:
        rot = [r.direction[0] * sensitivity, r.direction[1] * sensitivity];
        rotating = true;
        break;
      case -1:
        rotating = false;
        break;
      default:
        break;
    }
  };

  const zoomHandler = (delta: number) => {
    zoom = delta * 0.001;
  };

  const viewHandler = (t?: Transform): Transform => {
    if (!t || t?.isIdentity) {
      return Transform.lookAt(eye, target, vuv);
    }
    if (rot[0] === 0.0 && rot[1] === 0.0 && zoom === 0.0) {
      return t;
    }

    // 0. Apply the zoom
    const zoomMove = Vector.fromPoints(eye, target).scale(1.0 - zoom);
    if (zoomMove.length > 2.0) {
      eye = target.add(zoomMove);
    }

    // 1. Move the view frame to the origin
    const toOrigin = Vector.fromPoints(target, eye);
    const translation = Transform.move(toOrigin);
    // Compute the rotation frame as the camera frame translated to the origin
    const rotationFrame = translation.map(cameraFrame);

    // Now get the eye relative to the rotation frame
    const eyeInRotationFrame = rotationFrame.relative(eye);
    const vuvInRotationFrame = rotationFrame.relative(vuv);

    // 2. Rotate the view frame
    const rotation = Transform.rotationX(-rot[1]).compose(Transform.rotationY(-rot[0]));
    eye = rotation.map(eyeInRotationFrame).absolute(rotationFrame);
    vuv = rotation.map(vuvInRotationFrame).absolute(rotationFrame);

    // 3. Update the camera frame on the new eye and vuv
    cameraFrame = Frame.lookAt(eye, target, vuv);

    if (!rotating) {
      rot = [rot[0] * 0.98, rot[1] * 0.98];
      if (Math.abs(rot[0]) < 0.001 && Math.abs(rot[1]) < 0.001) {
        rot = [0.0, 0.0];
      }
    }
    zoom = 0;
    return cameraFrame.toTransform();
  };

  return [mouseHandler, zoomHandler, viewHandler];
};
