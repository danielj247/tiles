import { create } from "zustand";
import { Map } from "@/types/map";

export interface MapStore {
  map: Map | undefined;
  setMap: (map: Map) => void;
}

const useMapStore = create<MapStore>()((set) => ({
  map: undefined,
  setMap: (map: Map) => set({ map }),
}));

const getMapStore = useMapStore.getState;

// useMapStore for UI, getMapStore for canvas
export { useMapStore, getMapStore };
