import protoSet from "@/tilesets/proto";
import { Tileset } from "@/types/tileset";

export const proto: Tileset = {
  name: "proto",
  src: protoSet,
  tile: {
    width: 64,
    height: 128,
  },
};

export const grid: Tileset = {
  name: "grid",
  src: {},
  tile: {
    width: 64,
    height: 128,
  },
};
