export class Gpu extends  {
  readonly canvas: HTMLCanvasElement;
  readonly context: GPUCanvasContext;
  readonly device: GPUDevice;
  readonly format: GPUTextureFormat;

  private constructor() {}

  static async build(canvas: HTMLCanvasElement): Promise<GpuConnection> {
    return new GpuConnection(context, device, canvas, format);
  }
}
