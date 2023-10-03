import { create } from "zustand";
import { CleanMap, Map } from "@/types/map";

export interface MapStore {
  map: Map | undefined;
  setMap: (map: Map) => void;

  cleanMap: CleanMap | undefined;
  _cleanAndSetMap: (map: Map) => void;
}

const useMapStore = create<MapStore>()((set, get) => ({
  map: undefined,
  setMap: (map: Map) => {
    set({ map });
    get()._cleanAndSetMap(map);
  },

  cleanMap: undefined,
  _cleanAndSetMap: (map: Map) => {
    const cleanMap: CleanMap = {
      ...map,
      tileset: map.tileset.name,
      entities: map.entities.map((entity) => ({
        ...entity,
        sprite: entity.sprite.name,
      })),
    };

    set({ cleanMap });
  },
}));

const getMapStore = useMapStore.getState;

// useMapStore for UI, getMapStore for canvas
export { useMapStore, getMapStore };
