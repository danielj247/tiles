import { Rotation } from "@/types/rotation";
import { Sprite } from "@/types/sprite";
import { Vector2 } from "@/types/vector";

export enum EntityType {
  FLOOR = "floor",
  WALL = "wall",
}

export interface Entity {
  id: string;
  // type: EntityType;
  position: Vector2;
  rotation: Rotation;
  size: Vector2;
  sprite: Sprite;
  attributes?: {
    [key: string]: unknown;
  };
}
