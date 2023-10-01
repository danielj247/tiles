import { Vector2 } from "@/types/vector";

export interface Camera {
  position: Vector2;
  targetPosition: Vector2;
  zoom: number;
  panning: boolean;
  controls: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  };
}
