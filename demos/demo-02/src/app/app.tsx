// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';
import { init } from '../gpu/init';

export function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [gpu, setGpu] = React.useState<WebGPU.Gpu | null>(null);
  const [status, setStatus] = React.useState<string>('initializing...');

  React.useEffect(() => {
    if (canvasRef.current) {
      init(canvasRef.current)
        .then((gpu) => {
          setGpu(gpu);
          setStatus('We are good to go!');
        })
        .catch((error) => {
          setStatus(error.message);
        });
    }
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-xl my-2 mx-1">Demo 02</h1>
      <div>
        <canvas
          className="bg-blue-700 border-2 rounded-lg border-blue-600 mx-auto text-yellow-400"
          ref={canvasRef}
          width={800}
          height={600}
        ></canvas>
      </div>
      <div className="m-4">{status}</div>
    </div>
  );
}

export default App;
