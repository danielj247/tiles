import { getStore } from "@/store";
import { getTilesets } from "@/utils/tilesets";
import { Map, MapFile } from "@/types/map";
import { Entity } from "@/types/entity";

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
        description: "JSON file",
        accept: {
          "application/json": [".json"],
        },
      },
    ],
  });

  const writableStream = await newHandle.createWritable();

  await writableStream.write(blob);
  await writableStream.close();
}

export async function loadMapFile() {
  const [handle] = await window.showOpenFilePicker({
    types: [
      {
        description: "JSON file",
        accept: {
          "application/json": [".json"],
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

  return parseMapFile(map);
}

export async function parseMapFile(mapFile: MapFile): Promise<Map | undefined> {
  const tileset = getTilesets().find((t) => t.name === mapFile.tileset);

  if (!tileset) {
    console.error("Tileset not found");
    console.error(mapFile.tileset);
    console.error(tileset);
    return;
  }

  const entities = mapFile.entities.map((entity: Entity) => {
    const sprite = tileset.src[entity.sprite.name];

    return {
      ...entity,
      sprite: sprite,
    };
  });

  return {
    ...mapFile,
    tileset,
    entities,
  };
}

export async function loadMap() {
  const store = getStore();
  const loadedMap = await loadMapFile();

  if (!loadedMap) return;

  store.setMap(loadedMap);
}
