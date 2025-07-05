// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';
import { init } from '../gpu/init';
import { DirectionalLight, RGBAColorToStyle } from '@shaders-mono/webgpu';

export function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [gpu, setGpu] = React.useState<WebGPU.Gpu | null>(null);
  const [status, setStatus] = React.useState<string>('initializing...');
  const [wireframe, setWireframe] = React.useState<boolean>(false);
  const [, updateState] = React.useState<unknown>();
  const [fps, setFps] = React.useState<number>(0);
  const [texture, setTexture] = React.useState<ImageBitmap | null>(null);
  const forceUpdate = React.useCallback(() => updateState({}), []);

  React.useEffect(() => {
    const image = new Image();
    image.src = 'metal.png';
    image.onload = () => {
      createImageBitmap(image).then((sphere) => {
        setTexture(sphere);
      });
    };
  }, []);

  React.useEffect(() => {
    const intId = setInterval(() => {
      if (gpu) {
        const time = new Date();
        setFps(gpu.fps);
        setStatus(`${time.getHours()}:${time.getMinutes()} and ${time.getSeconds()}`);
      }
    }, 1000);
    if (!gpu && canvasRef.current && texture) {
      init(canvasRef.current, texture)
        .then(setGpu)
        .catch((error) => {
          console.error(error);
          setStatus(error.message);
        });
    }
    return () => {
      if (intId) {
        clearInterval(intId);
      }
    };
  }, [gpu, texture]);

  const onWireframe = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!gpu) return;
      setWireframe(() => e.target.checked);
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
      rgba[3] = 1; // gpu.dirLights[idx].col[3];
      gpu.dirLights[idx].col = rgba;
      forceUpdate();
    },
    [gpu, forceUpdate]
  );

  const colorPosLight = React.useCallback(
    (idx: number, col: string) => {
      if (!gpu) return;
      const rgba = WebGPU.styleHexColorToRGBA(col);
      rgba[3] = 1; // gpu.pontLights[idx].col[3];
      gpu.pontLights[idx].col = rgba;
      forceUpdate();
    },
    [gpu, forceUpdate]
  );
  return (
    <>
      <div className="bg-slate-900 flex flex-row justify-between items-center px-2 text-slate-400 border-b-[1px] border-slate-700">
        <h1 className="font-bold text-xl my-2 mx-1">Demo #2 - Clock animation</h1>
        <div className="m-4">{status} </div>
        <div className="m-4 w-20 text-center border-2 px-2">
          <code>FPS:{fps.toFixed(0)}</code>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <canvas className="bg-slate-800 text-yellow-400 w-full h-full" ref={canvasRef} width={600} height={600}></canvas>
      </div>
      <div className="bg-gray-700 flex flex-row justify-center flex-1 text-slate-400 items-stretch">
        <div className="flex flex-col justify-center border-slate-600 bg-slate-900 border-solid border-l-[1px] border-t-[1px] px-6 text-center">
          <label htmlFor="wireframe-check">Wireframe</label>
          <input id="wireframe-check" type="checkbox" className="m-4" onChange={onWireframe} checked={wireframe} />{' '}
        </div>
        <div className="flex p-0">
          {gpu &&
            gpu.dirLights.map((l: DirectionalLight, idx) => (
              <div
                key={`light-${idx}`}
                className="flex flex-col justify-center border-slate-600 bg-slate-900 border-solid border-l-[1px] border-t-[1px] p-1 text-center"
              >
                <label htmlFor={`light-${idx}}`}>Dir {idx}</label>
                <input id="light-1" type="checkbox" className="m-1" checked={l.col[3] !== 0} onChange={() => switchLight(idx)} />
                <input
                  id={`light-${idx}-color`}
                  type="color"
                  value={RGBAColorToStyle(l.col)}
                  onChange={(e) => colorLight(idx, e.target.value)}
                />
              </div>
            ))}
        </div>
        <div id="lights-panel" className="flex">
          {gpu &&
            gpu.pontLights.map((l: WebGPU.PointLight, idx) => (
              <div
                key={`pos-light-${idx}`}
                className="flex flex-col justify-center border-slate-600 bg-slate-900 border-solid border-l-[1px] border-t-[1px] p-1 text-center"
              >
                <label htmlFor={`pos-light-${idx}}`}>Pt {idx}</label>
                <input id="light-1" type="checkbox" className="m-1" checked={l.col[3] !== 0} onChange={() => switchPointLight(idx)} />
                <input
                  id={`pos-light-${idx}-color`}
                  type="color"
                  value={RGBAColorToStyle(l.col)}
                  onChange={(e) => colorPosLight(idx, e.target.value)}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
