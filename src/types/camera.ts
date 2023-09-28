import { Vector2 } from "@/types/vector";

export interface Camera {
  position: Vector2;
  targetPosition: Vector2;
  zoom: number;
  panning: boolean;
}
