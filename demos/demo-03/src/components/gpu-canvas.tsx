import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';

interface GpuCanvasProps {
  onError: (e: Error) => void;
  onConnected: (gpu: WebGPU.Gpu) => void;
}

export const GpuCanvas = ({ onError, onConnected }: GpuCanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [gpu, setGpu] = React.useState<WebGPU.Gpu | null>(null);
  const [fps, setFps] = React.useState<string>('0');
  const [vertexCount, setVertexCount] = React.useState<number>(0);

  React.useEffect(() => {
    const intId = setInterval(() => {
      if (gpu) {
        setFps(gpu.fps.toFixed(0));
        setVertexCount(gpu.vertexCount);
      }
    }, 1000);
    if (!gpu && canvasRef.current) {
      WebGPU.initialize(canvasRef.current)
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
          onConnected(gpuConn);
        })
        .catch((error) => {
          console.error(error);
          onError(error);
        });
    }
    return () => {
      if (intId) {
        clearInterval(intId);
      }
      if (gpu) {
        gpu.endRenderLoop();
        WebGPU.shutdownGpu(canvasRef.current);
        setGpu(null);
      }
    };
  }, [gpu, onError, onConnected]);
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
