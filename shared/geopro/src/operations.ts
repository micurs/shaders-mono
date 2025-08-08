import { Frame } from "./frame";
import { Point } from "./point";
import { Transform } from "./transform";
import { UnitVector } from "./unit-vector";
import { Vector } from "./vector";
import { Projection } from './projection';


export type Mappable = Vector | Point | UnitVector;
export type GeoMap = Transform | Frame | Projection;

export const map = (t: GeoMap) => (o: Mappable) => {
  return o.map(t);
}

export const compose = (...t: GeoMap[]) => {
  const [h, ...rest] = t;
  return rest.reduce<GeoMap>((accTrans, trans) => accTrans.compose(trans), h);
}



