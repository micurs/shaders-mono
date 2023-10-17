import { vec2 } from "gl-matrix";


export interface Ray2D {
  origin: vec2;
  direction: vec2;
}


export type VecEntries = [number, number, number, number ];

export type MatEntries = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];