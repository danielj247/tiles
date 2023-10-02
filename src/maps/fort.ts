import { proto } from "@/tilesets";
import { Entity } from "@/types/entity";
import { Rotation } from "@/types/rotation";
import { Map } from "@/types/map";

function generateMap(): Map {
  const entities: Entity[] = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      entities.push({
        id: `floor-${i}x${j}`,
        rotation: Rotation.NORTH,
        size: {
          x: 1,
          y: 1,
          z: 1,
        },
        position: {
          x: i,
          y: j,
          z: 0,
        },
        sprite: proto.src.floor,
      });
    }
  }

  // west wall
  for (let i = 1; i < 9; i++) {
    entities.push({
      id: `wall-west-${i}`,
      rotation: Rotation.WEST,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 0,
        y: i,
        z: 0,
      },
      sprite: proto.src.wall,
    });
  }

  // north wall
  for (let i = 1; i < 9; i++) {
    entities.push({
      id: `wall-north-${i}`,
      rotation: Rotation.SOUTH,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: i,
        y: 1,
        z: 0,
      },
      sprite: proto.src.wall,
    });
  }

  // south wall
  for (let i = 1; i < 9; i++) {
    entities.push({
      id: `wall-south-${i}`,
      rotation: Rotation.NORTH,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: i,
        y: 8,
        z: 0,
      },
      sprite: proto.src.wall,
    });
  }

  // east wall
  for (let i = 1; i < 9; i++) {
    if (i === 5) {
      entities.push({
        id: `door-east-${i}`,
        rotation: Rotation.WEST,
        size: {
          x: 1,
          y: 1,
          z: 1,
        },
        position: {
          x: 8,
          y: 5,
          z: 0,
        },
        sprite: proto.src.doorOpen,
      });
      continue;
    }

    entities.push({
      id: `wall-east-${i}`,
      rotation: Rotation.WEST,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 8,
        y: i,
        z: 0,
      },
      sprite: proto.src.wall,
    });
  }

  entities.push(
    {
      id: "block-1",
      rotation: Rotation.SOUTH,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 15,
        y: 15,
        z: 0,
      },
      sprite: proto.src.block,
    },
    {
      id: "block-2",
      rotation: Rotation.SOUTH,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 15,
        y: 15,
        z: 1,
      },
      sprite: proto.src.block,
    },
    {
      id: "block-3",
      rotation: Rotation.SOUTH,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 15,
        y: 15,
        z: 2,
      },
      sprite: proto.src.block,
    },
  );

  return {
    name: "fort",
    width: 20,
    height: 20,
    tileset: proto,
    entities,
  };
}

export default generateMap();
