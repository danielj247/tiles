import { getMapStore } from "@/stores/map";
import { getTilesets } from "@/utils/tilesets";
import { Map, CleanMap } from "@/types/map";

export async function saveMap(map: CleanMap) {
  const blob = new Blob([JSON.stringify(map)], { type: "text/plain" });

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

export function parseMapFile(mapFile: CleanMap): Map | undefined {
  const tileset = getTilesets().find((t) => t.name === mapFile.tileset);

  if (!tileset) {
    console.error("Tileset not found");
    console.error(mapFile.tileset);
    console.error(tileset);
    return;
  }

  const entities = mapFile.entities.map((entity) => {
    const sprite = tileset.src[entity.sprite];

    return {
      ...entity,
      sprite: sprite,
    };
  });

  return {
    name: mapFile.name,
    width: mapFile.width,
    height: mapFile.height,
    tileset,
    entities,
  };
}

export async function loadMap() {
  const mapStore = getMapStore();
  const loadedMap = await loadMapFile();

  if (!loadedMap) return;

  mapStore.setMap(loadedMap);
}
