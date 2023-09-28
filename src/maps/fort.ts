import proto from "@/tilesets/proto";
import { Entity, EntityType } from "@/types/entity";
import { Rotation } from "@/types/rotation";
import { Map } from "@/types/map";

function generateMap(): Map {
  const entities: Entity[] = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      entities.push({
        id: `floor-${i}x${j}`,
        type: EntityType.FLOOR,
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

  // west wall
  for (let i = 1; i < 9; i++) {
    entities.push({
      id: `wall-west-${i}`,
      type: EntityType.WALL,
      rotation: Rotation.WEST,
      size: {
        x: 1,
        y: 1,
      },
      position: {
        x: 0,
        y: i,
      },
      sprite: proto.wall,
    });
  }

  // north wall
  for (let i = 1; i < 9; i++) {
    entities.push({
      id: `wall-north-${i}`,
      type: EntityType.WALL,
      rotation: Rotation.SOUTH,
      size: {
        x: 1,
        y: 1,
      },
      position: {
        x: i,
        y: 1,
      },
      sprite: proto.wall,
    });
  }

  // south wall
  for (let i = 1; i < 9; i++) {
    entities.push({
      id: `wall-south-${i}`,
      type: EntityType.WALL,
      rotation: Rotation.NORTH,
      size: {
        x: 1,
        y: 1,
      },
      position: {
        x: i,
        y: 8,
      },
      sprite: proto.wall,
    });
  }

  // east wall
  for (let i = 1; i < 9; i++) {
    if (i === 5) {
      entities.push({
        id: `door-east-${i}`,
        type: EntityType.WALL,
        rotation: Rotation.WEST,
        size: {
          x: 1,
          y: 1,
        },
        position: {
          x: 8,
          y: 5,
        },
        sprite: proto.doorOpen,
      });
      continue;
    }

    entities.push({
      id: `wall-east-${i}`,
      type: EntityType.WALL,
      rotation: Rotation.WEST,
      size: {
        x: 1,
        y: 1,
      },
      position: {
        x: 8,
        y: i,
      },
      sprite: proto.wall,
    });
  }

  return {
    name: "fort",
    width: 1000,
    height: 1000,
    entities,
  };
}

export default generateMap();
