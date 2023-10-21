import { GPUConnection } from '../types';

export const setupShaderModule = async (
  { context, device, format }: GPUConnection,
  shadersSource: string
): Promise<GPUShaderModule> => {
  context.configure({
    device,
    format,
    alphaMode: 'opaque',
  });

  const shaderModule = device.createShaderModule({ code: shadersSource });
  const ci = await shaderModule.getCompilationInfo();
  ci.messages.forEach((m) => {
    let errMessage = m.message;
    if (m.lineNum) {
      errMessage = `Line ${m.lineNum}:${m.linePos} - "${shadersSource.substr(m.offset, m.length + 40)}"\n` + m.message;
    }
    console.error('WGSL error: ', errMessage);
  });
  return shaderModule;
};
