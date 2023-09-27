import { Entity } from "./entity";

export interface Map {
  width: number;
  height: number;
  entities: Entity[];
}