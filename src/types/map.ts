import { Entity } from "@/types/entity";

export interface Map {
  width: number;
  height: number;
  entities: Entity[];
}
