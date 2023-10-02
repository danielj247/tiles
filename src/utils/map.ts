import { Map } from "@/types/map";
import { getTilesets } from "./tilesets";
import { Entity } from "../types/entity";

export async function saveMap(map: Map) {
  const mapSave = {
    name: map.name,
    width: map.width,
    height: map.height,
    tileset: map.tileset.name,
    entities: map.entities,
  };

  const blob = new Blob([JSON.stringify(mapSave)], { type: "text/plain" });
  const newHandle = await window.showSaveFilePicker({
    suggestedName: map.name,
    types: [
      {
        description: "tiles JSON file",
        accept: {
          "application/json": [".tiles"],
        },
      },
    ],
  });

  const writableStream = await newHandle.createWritable();

  await writableStream.write(blob);
  await writableStream.close();
}

export async function loadMap() {
  const [handle] = await window.showOpenFilePicker({
    types: [
      {
        description: "tiles JSON file",
        accept: {
          "application/json": [".tiles"],
        },
      },
    ],
  });

  const file = await handle.getFile();
  const map = JSON.parse(await file.text());

  const hasProperties = !!(
    map?.name ||
    map?.width ||
    map?.height ||
    map?.tileset
  );

  if (!map) {
    console.error("No map file provided");
    return;
  }

  if (!hasProperties) {
    console.error("Map file is missing required properties");
    console.error(map);
    console.error(map?.name, map?.width, map?.height, map?.tileset);
    return;
  }

  const tileset = getTilesets().find((t) => t.name === map.tileset);

  if (!tileset) {
    console.error("Tileset not found");
    console.error(map.tileset);
    console.error(tileset);
    return;
  }

  const entities = map.entities.map((entity: Entity) => {
    const sprite = tileset.src[entity.sprite.name];

    return {
      ...entity,
      sprite: sprite,
    };
  });

  return {
    ...map,
    tileset,
    entities,
  };
}
