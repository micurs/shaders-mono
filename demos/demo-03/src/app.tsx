import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';

import './app.css';
import { GpuCanvas } from './components/gpu-canvas';
import { GeoToolbar } from './components/geo-toolbar';
import { GeoTool } from './types';
import { addGpuGeo } from './gpu-utils/geo';

const border = 'border-solid border-[1px] border-slate-800 mt-[-1px]';

function App() {
  const [gpuError, setGpuError] = React.useState<string>('Initializing WebGPU...');
  const [gpu, setGpu] = React.useState<WebGPU.Gpu | null>(null);

  const handleGpuError = (e: Error) => {
    setGpuError(e.message);
  };

  const handleGpuConnected = (gpu: WebGPU.Gpu) => {
    setGpu(gpu);
    setGpuError('');
  };

  const handleToolSelection = (geoType: GeoTool) => {
    if (!gpu) {
      setGpuError('WebGPU not initialized');
      return;
    }
    addGpuGeo(gpu, geoType);
  };

  return (
    <>
      <div className={`flex flex-row justify-between items-center ${border} h-[40px]  leading-[40px]`} id="top-bar">
        <h1 className="mx-2">Hello demo-03</h1>
      </div>
      <div id="app-space" className={`flex-1 flex flex-row overflow-hidden ${border} min-h-[600px]`}>
        <GeoToolbar onSelected={handleToolSelection} />
        <div className="flex-1">
          <GpuCanvas onError={handleGpuError} onConnected={handleGpuConnected} />
        </div>
      </div>
      <div id="bottom-bar" className={`flex flex-row justify-between items-stretch text-xs ${border} h-[30px] leading-[30px]`}>
        <h3 className="m-0">Bottom bar</h3>
        {gpuError.length === 0 ? (
          <div className={`px-2 ${border}`}>WebGPU ✅ </div>
        ) : (
          <div className={`text-red-500 px-2 ${border}`}>{gpuError}</div>
        )}
      </div>
    </>
  );
}

export default App;
