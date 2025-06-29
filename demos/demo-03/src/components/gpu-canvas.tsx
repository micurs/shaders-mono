import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';
import { Point, UnitVector } from '@shaders-mono/geopro';

interface GpuCanvasProps {
  onError: (e: Error) => void;
  onConnected: (gpu: WebGPU.Gpu) => void;
}

const buildLights = (gpu: WebGPU.Gpu) => {
  gpu.setAmbientLight([0.15, 0.15, 0.2, 1.0]);

  gpu.setLight('directional', 0, { dir: UnitVector.fromValues(0, 10, -10), col: [0.3, 0.3, 0.3, 1.0] });
  gpu.setLight('directional', 1, { dir: UnitVector.fromValues(-10, 0, -10), col: [0.4, 0.4, 0.4, 1.0] });
  gpu.setLight('point', 0, { pos: Point.fromValues(15, 15, 20), col: [0.5, 0.5, 0.45, 15.0] });
  gpu.setLight('point', 1, { pos: Point.fromValues(-15, -15, 20), col: [0.3, 0.3, 0.7, 15.0] });
  gpu.setLight('point', 2, { pos: Point.fromValues(15, -15, 20), col: [0.7, 0.1, 0.2, 20.0] });
  gpu.setLight('point', 3, { pos: Point.fromValues(-15, 15, 20), col: [0.5, 0.6, 0.0, 15.0] });
};

export const GpuCanvas = ({ onError, onConnected }: GpuCanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [gpu, setGpu] = React.useState<WebGPU.Gpu | null>(null);
  const [fps, setFps] = React.useState<string>('0');
  const [vertexCount, setVertexCount] = React.useState<number>(0);
  const [connected, setConnected] = React.useState<boolean>(false);

  // Update FPS and vertex count
  React.useEffect(() => {
    const onceId = setTimeout(() => {
      if (gpu && !connected) {
        onConnected(gpu);
        setConnected(true);
      }
    }, 10);
    const intId = setInterval(() => {
      if (gpu && connected) {
        setFps(gpu.fps.toFixed(0));
        setVertexCount(gpu.vertexCount);
      }
    }, 1000);
    return () => {
      if (intId) {
        clearInterval(intId);
        clearTimeout(onceId);
      }
    };
  }, [gpu, connected, onConnected]);

  // Initialize WebGPU
  React.useEffect(() => {
    WebGPU.initialize(canvasRef.current!)
      .then((gpu) => gpu.setupShaders('standard-3d'))
      .then((gpu) => {
        if (!gpu) {
          return;
        }

        const [mouseHandlers, viewHandlers] = WebGPU.getOrbitHandlers(gpu, [25, 25, 15]);
        gpu.captureMouseMotion(mouseHandlers);
        gpu.setScene([]);
        buildLights(gpu);
        gpu.beginRenderLoop({
          camera: viewHandlers,
        });
        setGpu(gpu);
      })
      .catch((error) => {
        console.error(error);
        onError(error);
      });
    return () => {
      if (gpu) {
        // WebGPU.shutdownGpu(canvasRef.current);
        gpu.endRenderLoop();
        setGpu(null);
      }
    };
  }, []);
  return (
    <div className="w-full h-full relative">
      <canvas className="bg-black text-yellow-400 w-full h-full" ref={canvasRef} width={600} height={600}></canvas>;
      <div className="absolute top-0 right-0 p-2 text-xs text-gray-400 bg-gray-700/25 w-40 text-left">FPS: {fps}</div>
      <div className="absolute top-8 right-0 p-2 text-xs text-gray-400 bg-gray-700/25 w-40 text-left">
        Vtx: {Math.round(vertexCount / 1000)}K
      </div>
    </div>
  );
};

