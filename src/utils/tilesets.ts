import * as tilesets from "@/tilesets";

export function getTilesets() {
  return Object.values(tilesets).filter((t) => t.name !== "grid");
}
