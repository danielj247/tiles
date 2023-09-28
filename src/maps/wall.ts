import proto from "@/tilesets/proto";
import { Entity } from "@/types/entity";
import { Rotation } from "@/types/rotation";
import { Map } from "@/types/map";

function generateMap(): Map {
  const entities: Entity[] = [];

  for (let i = 2; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
      entities.push({
        id: `floor-${i}x${j}`,
        rotation: Rotation.NORTH,
        size: {
          x: 1,
          y: 1,
        },
        position: {
          x: i,
          y: j,
        },
        sprite: proto.floor,
      });
    }
  }

  for (let i = 1; i < 9; i++) {
    entities.push({
      id: `wall-east-${i}`,
      rotation: Rotation.WEST,
      size: {
        x: 1,
        y: 1,
      },
      position: {
        x: 2,
        y: i,
      },
      sprite: proto.wall,
    });

    for (let j = 0; j < 4; j++) {
      const rotation = [
        Rotation.SOUTH,
        Rotation.WEST,
        Rotation.EAST,
        Rotation.NORTH,
      ][j];

      entities.push({
        id: `wall-floor-${i}`,
        rotation,
        size: {
          x: 1,
          y: 1,
        },
        position: {
          x: 3,
          y: i,
        },
        sprite: proto.blockHalf,
      });
    }
  }

  entities.push({
    id: "steps-1",
    rotation: Rotation.EAST,
    size: {
      x: 1,
      y: 1,
    },
    position: {
      x: 4,
      y: 1,
    },
    sprite: proto.steps,
  });

  entities.push({
    id: "steps-2",
    rotation: Rotation.EAST,
    size: {
      x: 1,
      y: 1,
    },
    position: {
      x: 4,
      y: 8,
    },
    sprite: proto.steps,
  });

  return {
    name: "wall",
    width: 1000,
    height: 1000,
    entities,
  };
}

export default generateMap();
