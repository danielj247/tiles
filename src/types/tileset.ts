import { Sprite } from "./sprite";

export interface TilesetSource {
  [key: string]: Sprite;
}

export interface Tileset {
  name: string;
  src: TilesetSource;
  tile: {
    width: number;
    height: number;
  };
}
