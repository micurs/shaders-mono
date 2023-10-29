// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';
import { init } from '../gpu/init';

export function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [gpu, setGpu] = React.useState<WebGPU.Gpu | null>(null);
  const [status, setStatus] = React.useState<string>('initializing...');
  const [wireframe, setWireframe] = React.useState<boolean>(false);

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

  const onWireframe = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!gpu) return;
      setWireframe((w) => e.target.checked);
      if (e.target.checked) {
        gpu.setPipelineMode('alternative');
      } else {
        gpu.setPipelineMode('default');
      }
    },
    [gpu]
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center mx-2">
        <h1 className="font-bold text-xl my-2 mx-1">Demo 02</h1>
        <div className="m-4">{status}</div>
      </div>
      <div>
        <canvas
          className="bg-blue-900 border-2 rounded-lg border-blue-600 mx-auto text-yellow-400"
          ref={canvasRef}
          width={800}
          height={600}
        ></canvas>
      </div>
      <div>
        <input id="wireframe-check" type="checkbox" className="m-4" onChange={onWireframe} checked={wireframe} />{' '}
        <label htmlFor="wireframe-check">Wireframe</label>
      </div>
    </div>
  );
}

export default App;
