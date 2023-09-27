import { Vector2 } from "./vector";

export enum EntityType {
  Block,
}

export interface Entity {
  type: EntityType;
  position: Vector2;
  size: Vector2;
  sprite: string;
}

export interface Block extends Entity {
  type: EntityType.Block;
}
