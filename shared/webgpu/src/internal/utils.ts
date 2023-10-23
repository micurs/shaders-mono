export const createGPUBufferUint = (
  device: GPUDevice,
  data: Uint32Array,
  usageFlag: GPUBufferUsageFlags = GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
) => {
  const buffer = device.createBuffer({
    size: data.byteLength,
    usage: usageFlag,
    mappedAtCreation: true,
  });
  new Uint32Array(buffer.getMappedRange()).set(data);
  buffer.unmap();
  return buffer;
};

/**
 * Create a buffer for a Float32Array
 * @param device
 * @param data
 * @param usageFlag
 * @returns
 */
export const createGPUBuffer = (
  device: GPUDevice,
  data: Float32Array,
  usageFlag: GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
) => {
  const buffer = device.createBuffer({
    size: data.byteLength,
    usage: usageFlag,
    mappedAtCreation: true,
  });
  new Float32Array(buffer.getMappedRange()).set(data);
  buffer.unmap();
  return buffer;
};


/**
 * Parse a style color in the forma rgb(r,g,b) or rgba(r,g,b,a) to a GPUColor object
 * @param styleColor
 * @returns
 */
export const styleColorToGpu = (styleColor: string): GPUColor => {
  let values: number[] = [];

  // Extract numbers from the rgb/rgba string
  const regex = /rgba?\(([^)]+)\)/;
  const matches = regex.exec(styleColor);

  if (matches && matches[1]) {
      values = matches[1].split(",").map(num => parseFloat(num.trim()));
  }

  if (values.length < 3) {
      throw new Error("Invalid RGB/RGBA format");
  }

  const r = values[0] / 255;
  const g = values[1] / 255;
  const b = values[2] / 255;
  const a = (values.length === 4) ? values[3] : 1; // default to 1 if alpha is not provided

  return { r, g, b, a };
};
