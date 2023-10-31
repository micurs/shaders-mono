// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';
import { init } from '../gpu/init';
import { DirectionalLight, RGBAColorToStyle } from '@shaders-mono/webgpu';
import { kill } from 'process';

export function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [gpu, setGpu] = React.useState<WebGPU.Gpu | null>(null);
  const [status, setStatus] = React.useState<string>('initializing...');
  const [wireframe, setWireframe] = React.useState<boolean>(false);
  const [, updateState] = React.useState<any>();
  const [fps, setFps] = React.useState<number>(0);
  const forceUpdate = React.useCallback(() => updateState({}), []);

  React.useEffect(() => {
    const intId = setInterval(() => {
      if (gpu) {
        setFps(gpu.fps);
      }
    }, 1000);
    if (!gpu && canvasRef.current) {
      init(canvasRef.current)
        .then((gpu) => {
          setGpu(gpu);
          setStatus('We are good to go!');
        })
        .catch((error) => {
          setStatus(error.message);
        });
    }
    return () => {
      if (intId) {
        clearInterval(intId);
      }
    };
  }, [gpu]);

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

  const switchLight = React.useCallback(
    (idx: number) => {
      if (!gpu) return;
      gpu.dirLights[idx].col[3] = gpu.dirLights[idx].col[3] === 0 ? 1 : 0;
      forceUpdate();
    },
    [gpu, forceUpdate]
  );

  const switchPointLight = React.useCallback(
    (idx: number) => {
      if (!gpu) return;
      gpu.pontLights[idx].col[3] = gpu.pontLights[idx].col[3] === 0 ? 1 : 0;
      forceUpdate();
    },
    [gpu, forceUpdate]
  );

  const colorLight = React.useCallback(
    (idx: number, col: string) => {
      if (!gpu) return;
      const rgba = WebGPU.styleHexColorToRGBA(col);
      rgba[3] = gpu.dirLights[idx].col[3];
      gpu.dirLights[idx].col = rgba;
      forceUpdate();
    },
    [gpu, forceUpdate]
  );

  const colorPosLight = React.useCallback(
    (idx: number, col: string) => {
      if (!gpu) return;
      const rgba = WebGPU.styleHexColorToRGBA(col);
      rgba[3] = gpu.pontLights[idx].col[3];
      gpu.pontLights[idx].col = rgba;
      forceUpdate();
    },
    [gpu, forceUpdate]
  );
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center mx-2">
        <h1 className="font-bold text-xl my-2 mx-1">Demo 02</h1>
        <div className="m-4">{status} </div>
        <div className="m-4 w-20 text-center border-2 px-2">
          <code>FPS:{fps.toFixed(0)}</code>
        </div>
      </div>
      <div className="z-50">
        <canvas
          className="z-50 bg-black border-2 rounded-lg border-blue-600 mx-auto text-yellow-400"
          ref={canvasRef}
          width={800}
          height={600}
        ></canvas>
      </div>
      <div className="bg-gray-300 w-[800px] mx-auto my-1 p-1 flex flex-row justify-center items-center">
        <div className="mx-8">
          <input id="wireframe-check" type="checkbox" className="m-4" onChange={onWireframe} checked={wireframe} />{' '}
          <label htmlFor="wireframe-check">Wireframe</label>
        </div>
        <div className="flex">
          {gpu &&
            gpu.dirLights.map((l: DirectionalLight, idx) => (
              <div key={`light-${idx}`} className="flex flex-col justify-center border-gray-500 border-2 mx-1 p-1 text-center">
                <label htmlFor={`light-${idx}}`}>Dir {idx}</label>
                <input id="light-1" type="checkbox" className="m-1" checked={l.col[3] !== 0} onChange={(e) => switchLight(idx)} />
                <input
                  id={`light-${idx}-color`}
                  type="color"
                  className="m-1"
                  value={RGBAColorToStyle(l.col)}
                  onChange={(e) => colorLight(idx, e.target.value)}
                />
              </div>
            ))}
        </div>
        <div className="flex">
          {gpu &&
            gpu.pontLights.map((l: WebGPU.PointLight, idx) => (
              <div key={`pos-light-${idx}`} className="flex flex-col justify-center border-gray-500 border-2 mx-1 p-1 text-center">
                <label htmlFor={`pos-light-${idx}}`}>Pt {idx}</label>
                <input id="light-1" type="checkbox" className="m-1" checked={l.col[3] !== 0} onChange={(e) => switchPointLight(idx)} />
                <input
                  id={`pos-light-${idx}-color`}
                  type="color"
                  className="m-1"
                  value={RGBAColorToStyle(l.col)}
                  onChange={(e) => colorPosLight(idx, e.target.value)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
