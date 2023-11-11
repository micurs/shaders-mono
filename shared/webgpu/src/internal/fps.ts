export const init = () => {
  let lastTimeSpan = 0;
  let lastTime = Date.now();
  let lastFPSIdx = 0;
  const lastFPS: number[] = [];

  const measureFPS = () => {
    const time = Date.now();
    lastTimeSpan = Math.max(time - lastTime, 1);
    lastFPSIdx = (lastFPSIdx + 1) % 10;
    lastFPS[lastFPSIdx] = 1000 / lastTimeSpan;
    lastTime = time;
  };

  const getFPS = () => {
    return lastFPS.reduce((p, c) => p + c, 0) / lastFPS.length;
  };

  const getLastTimeSpan = () => {
    return lastTimeSpan;
  };

  return { getFPS, measureFPS, getLastTimeSpan };
};
