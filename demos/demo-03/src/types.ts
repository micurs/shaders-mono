import { Scene } from '@shaders-mono/webgpu';
import * as OIMO from 'oimo';

export type GeoTool = 'plane' | 'sphere' | 'cube' | 'cylinder' | 'cone' | 'torus';

export type WorldScene = Scene<OIMO.Body | null>;

export interface Textures {
  sphere?: ImageBitmap;
}
