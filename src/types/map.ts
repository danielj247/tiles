import { Entity } from "@/types/entity";

export interface Map {
  name: string;
  width: number;
  height: number;
  entities: Entity[];
}
