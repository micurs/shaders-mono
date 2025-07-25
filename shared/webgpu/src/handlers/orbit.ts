import { Frame, Point, Transform, UnitVector, Vector } from '@shaders-mono/geopro';
import { MouseCbs, MouseLocation, MouseMovement, CameraTransformationHandlers, MouseButton } from '../types';
import { Gpu } from '../gpu-connection';

export const getOrbitHandlers = (gpu: Gpu, eyeStart: [number, number, number] = [10, 10, 10], initialFov: number = Math.PI / 5): [MouseCbs, CameraTransformationHandlers] => {
  let target = Point.fromValues(0, 0, 0);
  let eye = Point.fromValues(...eyeStart);
  let vuv = eye.x === 0 && eye.y === 0 ? UnitVector.fromValues(0, 1, 0) : UnitVector.fromValues(0, 0, 1);
  let rot = [0.0, 0.0];
  let pan = [0.0, 0.0];
  let zoom = 0.0;
  let tilt = 0.0;
  let fov = initialFov;
  let distToTarget = Vector.fromPoints(eye, target).lengthSquare;
  let cameraFrame = Frame.lookAt(eye, target, vuv);
  let rotating = false;

  const mouseHandler = (bt: MouseButton, r: MouseMovement, _p: MouseLocation) => {
    const minRes = Math.min(gpu.canvas.width, gpu.canvas.height);
    const maxRes = Math.max(gpu.canvas.width, gpu.canvas.height);
    let rotSensitivity = (Math.log(distToTarget) * Math.atan(fov)) / (maxRes / 2);
    let panSensitivity = (fov / minRes) * 2;
    switch (bt) {
      case 'mouse-0':
        rot = [r.direction[0] * rotSensitivity, r.direction[1] * rotSensitivity];
        rotating = true;
        break;
      case 'mouse-1':
        pan = [-r.direction[0] * panSensitivity, r.direction[1] * panSensitivity];
        break;
      case 'mouse-2':
        fov += r.direction[1] * panSensitivity;
        break;
      case 'none':
        rotating = false;
        break;
      default:
        break;
    }
  };

  const zoomHandler = (delta: number) => {
    const sensitivity = Math.log(distToTarget + 1) / (4000 * Math.atan(fov));
    zoom = delta * sensitivity;
  };

  const tiltHandler = (delta: number) => {
    tilt = delta * 0.0005;
    rotating = false;
  };

  const projectionHandler = (_t?: Transform): Transform => {
    const aspectRatio = gpu.canvas.width / gpu.canvas.height;
    const ltoTarget = Vector.fromPoints(eye, target).length;
    const depth = Math.max(400, ltoTarget * 0.8);
    return Transform.perspective(fov, aspectRatio, Math.max(0.01, ltoTarget - depth), ltoTarget + depth);
  };

  const viewHandler = (t?: Transform): Transform => {
    if (!t || t?.isIdentity) {
      return Transform.lookAt(eye, target, vuv);
    }

    // 0. Apply zoom
    const zoomMove = Vector.fromPoints(eye, target).scale(1.0 - zoom);
    if (zoomMove.length > 2.0 && zoomMove.length < 500.0) {
      eye = target.add(zoomMove);
    }

    // 1. Move the view frame to the origin
    const toOrigin = Vector.fromPoints(target, eye);
    const translation = Transform.move(toOrigin);

    // Compute the rotation frame as the camera frame translated to the origin
    const cameraMoveFrame = translation.apply(cameraFrame);

    // 2. Perform the pan on the XY plane of the cameraMoveFrame
    const targetPan = [Math.tan(pan[0]) * distToTarget, Math.tan(pan[1]) * distToTarget];
    const moveVector = Vector.fromValues(targetPan[0], targetPan[1], 0).absolute(cameraMoveFrame);

    // Now get the eye relative to the rotation frame
    const eyeInRotationFrame = cameraMoveFrame.relative(eye);
    let vuvInRotationFrame = cameraMoveFrame.relative(vuv);

   // 2. Perform the tilt
   const tiltRotation = Transform.rotationZ(tilt);
   vuvInRotationFrame = tiltRotation.apply(vuvInRotationFrame);

   // 3. Rotate the view frame
   const rotation = Transform.rotationX(-rot[1]).compose(Transform.rotationY(-rot[0]));
   eye = rotation.apply(eyeInRotationFrame).absolute(cameraMoveFrame);
   vuv = rotation.apply(vuvInRotationFrame).absolute(cameraMoveFrame);
   const move = Transform.move(moveVector);

    target = move.apply(target);
    eye = move.apply(eye);

    // 4. Update the camera frame on the new eye and vuv
    cameraFrame = Frame.lookAt(eye, target, vuv);

    // Reset pan, zoom and rot (for rotation do a smooth stop)
    if (!rotating) {
      rot = [rot[0] * 0.95, rot[1] * 0.95];
      tilt *= 0.9;
      zoom *= 0.9;
      if (Math.abs(rot[0]) < 0.001 && Math.abs(rot[1]) < 0.001 && Math.abs(tilt) < 0.001 && Math.abs(zoom) < 0.001) {
        rot = [0.0, 0.0];
        tilt = 0;
        zoom = 0;
      }
    }
    pan = [0, 0];
    distToTarget = Vector.fromPoints(eye, target).length;
    return cameraFrame.toTransform();
  };

  return [
    // Mouse handlers
    {
      move: mouseHandler,
      zoom: zoomHandler,
      tilt: tiltHandler,
    },
    // Matrix camera handlers
    {
      view: viewHandler,
      projection: projectionHandler,
    },
  ];
};
