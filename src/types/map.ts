import { Entity } from "@/types/entity";
import { Tileset } from "@/types/tileset";

export interface Map {
  name: string;
  width: number;
  height: number;
  tileset: Tileset;
  entities: Entity[];
}
