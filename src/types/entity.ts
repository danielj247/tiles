import { Rotation } from "@/types/rotation";
import { Sprite } from "@/types/sprite";
import { Vector3 } from "@/types/vector";

export enum EntityType {
  FLOOR = "floor",
  WALL = "wall",
}

export interface Entity {
  id: string;
  position: Vector3;
  rotation: Rotation;
  size: Vector3;
  sprite: Sprite;
  attributes?: {
    [key: string]: unknown;
  };
}

export interface CleanEntity {
  id: string;
  position: Vector3;
  rotation: Rotation;
  size: Vector3;
  sprite: string;
  attributes?: {
    [key: string]: unknown;
  };
}
