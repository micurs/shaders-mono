/* eslint-disable  @typescript-eslint/no-explicit-any */

import { S } from 'vitest/dist/reporters-5f784f42.js';

declare module 'oimo' {
  interface Vec3 {
    x: number;
    y: number;
    z: number;
  }
  interface Vec4 extends Vec3 {
    w: number;
  }

  interface WorldOptions {
    info: boolean;
    broadphase?: 1 | 2 | 3; // 1 brute force, 2 sweep and prune, 3 volume tree
    worldscale: number;
    iterations?: number;
    random?: boolean;
    timestep?: number;
    gravity?: [number, number, number];
  }

  export declare class World {
    constructor(options: WorldOptions);

    getInfo(): any;
    play(): void;
    stop(): void;
    setGravity(gValues: Vec3): void;
    clear(): void;
    add(shape: Shape): Body;
    remove(shape: Shape): void;
    step(): void; // Advance the simulation by one step
  }

  export declare class Body {
    sleeping: boolean;
    isDynamic: boolean;
    getPosition(): Vec3;
    getQuaternion(): Vec4;
  }
}
