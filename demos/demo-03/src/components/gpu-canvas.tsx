import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';
import { on } from 'events';

interface GpuCanvasProps {
  onError: (e: Error) => void;
  onConnected: (gpu: WebGPU.Gpu) => void;
}

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
      .then((gpuConn) => gpuConn.setupShaders('standard-3d'))
      .then((gpuConn) => {
        if (!gpuConn) {
          return;
        }
        const [mouseHandlers, viewHandlers] = WebGPU.getOrbitHandlers(gpuConn, [15, 15, 15]);
        gpuConn.captureMouseMotion(mouseHandlers);
        gpuConn.setScene([]);
        gpuConn.beginRenderLoop({
          camera: viewHandlers,
        });
        setGpu(gpuConn);
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
