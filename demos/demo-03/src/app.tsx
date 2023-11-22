import React from 'react';
import * as WebGPU from '@shaders-mono/webgpu';
import * as OIMO from 'oimo';

import './app.css';
import { GpuCanvas } from './components/gpu-canvas';
import { GeoToolbar } from './components/geo-toolbar';
import { GeoTool } from './types';
import { addGpuGeo } from './gpu-utils/geo';
import { createWorld, updatePhysics } from './oimo/utils';

const borderClass = 'border-solid border-[1px] border-slate-800 mt-[-1px]';

function App() {
  const [gpuError, setGpuError] = React.useState<string>('Initializing WebGPU...');
  const [gpu, setGpu] = React.useState<WebGPU.Gpu | null>(null);
  const [world, setWorld] = React.useState<OIMO.World | null>(null);
  const [textures, setTextures] = React.useState<WebGPU.Material[]>([]);

  React.useEffect(() => {
    if (!gpu) {
      return;
    }
    WebGPU.loadTextures(gpu, ['soccer.png', 'dice.jpg', 'wood.jpg'])
      .then(([_, textures]) => {
        setTextures(textures);
      })
      .catch((e) => setGpuError(e.message));
  }, [gpu]);

  const handleGpuError = (e: Error) => {
    setGpuError(e.message);
  };

  const handleGpuConnected = (gpu: WebGPU.Gpu) => {
    setGpu(gpu);
    setGpuError('');
    const world = createWorld();
    setWorld(world);
    gpu.onRender(() => {
      if (world) {
        updatePhysics(world, gpu);
      }
    });
  };

  const handleGeoAdd = (geoType: GeoTool) => {
    if (!gpu || !world) {
      setGpuError('WebGPU not initialized');
      return;
    }
    addGpuGeo(gpu, world, geoType, textures);
  };

  const handleClear = () => {
    if (!gpu || !world) {
      setGpuError('WebGPU not initialized');
      return;
    }
    gpu.clearScene();
    world.clear();
  };

  return (
    <>
      <div className={`flex flex-row justify-between items-center ${borderClass} h-[40px]  leading-[40px]`} id="top-bar">
        <h1 className="mx-2">Demo # 3 - WebGPU and Oimo.js</h1>
      </div>
      <div id="app-space" className={`flex-1 flex flex-row overflow-hidden ${borderClass} min-h-[600px] bg-gray-800`}>
        <GeoToolbar onSelected={handleGeoAdd} onClear={handleClear} />
        <div className="flex-1">
          <GpuCanvas onError={handleGpuError} onConnected={handleGpuConnected} />
        </div>
      </div>
      <div id="bottom-bar" className={`flex flex-row justify-between items-stretch text-xs ${borderClass} h-[30px] leading-[30px]`}>
        <h3 className="m-0">Bottom bar</h3>
        {gpuError.length === 0 ? (
          <div className={`px-2 ${borderClass}`}>WebGPU ✅ </div>
        ) : (
          <div className={`text-red-500 px-2 ${borderClass}`}>{gpuError}</div>
        )}
      </div>
    </>
  );
}

export default App;
