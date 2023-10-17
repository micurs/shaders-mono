
export const deg2rad = (deg: number): number => {
  return deg / 180.0 * Math.PI;
}

export const rad2deg = (rad: number): number => {
  return rad / Math.PI * 180.0;
}

export const round = (num: number, n: number) => {
  return +(`${Math.round(parseFloat(`${num}e+${n}`))}e-${n}`);
}
