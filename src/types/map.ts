import { CleanEntity, Entity } from "@/types/entity";
import { Tileset } from "@/types/tileset";

export interface Map {
  name: string;
  width: number;
  height: number;
  tileset: Tileset;
  entities: Entity[];
}

export interface CleanMap {
  name: string;
  width: number;
  height: number;
  tileset: string;
  entities: CleanEntity[];
}

export interface MapFile extends CleanMap {
  default?: Map;
}
