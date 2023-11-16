export const init = () => {
  let renderingTime = 0;
  let lastTime = performance.now();
  let lastFPSIdx = 0;
  const lastFPS: number[] = [];
  console.log('Init FPS', lastTime);

  const measureFPS = () => {
    const time = performance.now();
    renderingTime = time - lastTime;
    if (renderingTime <= 1.0) {
      return lastFPS[lastFPSIdx];
    }
    // console.log('lastTimeSpan', lastTimeSpan);
    lastFPSIdx = (lastFPSIdx + 1) % 10;
    lastFPS[lastFPSIdx] = 1000 / renderingTime;

    lastTime = performance.now();
    // console.log('lastTime', lastTime.toFixed(0));
    return renderingTime;
  };

  const getFPS = () => {
    return lastFPS.reduce((p, c) => p + c, 0) / lastFPS.length;
  };

  const getLastTimeSpan = () => {
    return renderingTime;
  };

  return { getFPS, measureFPS, getLastTimeSpan };
};
