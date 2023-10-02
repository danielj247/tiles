import { getStore } from "@/store";
import { getTilesets } from "@/utils/tilesets";
import { DialogFormData, FormComponent } from "@/types/dialog-form";
import { Tileset } from "@/types/tileset";
import { Map } from "@/types/map";

const TILESETS = getTilesets();

export const DIALOG_DATA: DialogFormData = {
  newMap: {
    title: "New map",
    description: "Create a new map",
    confirm: "Create map",
    components: [
      {
        component: FormComponent.Input,
        props: {
          name: "map-name",
          required: true,
          children: "Map name",
          type: "text",
          placeholder: "Loch Ness",
        },
      },
      {
        component: FormComponent.Input,
        props: {
          name: "width",
          required: true,
          children: "Width",
          type: "number",
          defaultValue: "20",
          max: 100,
        },
      },
      {
        component: FormComponent.Input,
        props: {
          name: "height",
          required: true,
          children: "Height",
          type: "number",
          defaultValue: "20",
          max: 100,
        },
      },
      {
        component: FormComponent.Select,
        props: {
          name: "tileset",
          required: true,
          children: "Tileset",
          placeholder: "Select a tileset",
          options: TILESETS.map((tileset) => ({
            value: tileset.name,
            label: tileset.name[0].toUpperCase() + tileset.name.slice(1),
          })),
        },
      },
    ],
    onSubmit: (event, close) => {
      event.preventDefault();
      const store = getStore();
      const form = event.target as HTMLFormElement;
      const name = form.elements.namedItem("map-name") as HTMLInputElement;
      const width = form.elements.namedItem("width") as HTMLInputElement;
      const height = form.elements.namedItem("height") as HTMLInputElement;
      const tileset = form.elements.namedItem("tileset") as HTMLSelectElement;

      const map: Map = {
        name: name.value,
        width: parseInt(width.value),
        height: parseInt(height.value),
        tileset: TILESETS.find((t) => t.name === tileset.value) as Tileset,
        entities: [],
      };

      store.setMap(map);
      close();
    },
  },
};
