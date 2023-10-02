import { useState } from "react";
import { MenubarProps } from "@radix-ui/react-menubar";
import { getStore, useStore } from "@/store";
import { proto } from "@/tilesets";
import DialogFormRenderer from "@/ui/components/menu-bar/dialog-form-renderer";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/ui/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/ui/components/ui/dialog";
import { Map } from "@/types/map";
import { DialogFormData, FormComponent } from "@/types/dialog-form";
import * as tilesets from "@/tilesets";
import { Tileset } from "~/src/types/tileset";

const DIALOG_DATA: DialogFormData = {
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
          options: Object.values(tilesets)
            .filter((t) => t.name !== "grid")
            .map((tileset) => ({
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
        tileset:
          (Object.values(tilesets) as Array<Tileset>).find(
            (t) => t.name === tileset.value,
          ) || proto,
        entities: [],
      };

      store.setMap(map);
      close();
    },
  },
};

export default function MenuBar(props: MenubarProps) {
  const setMap = useStore((state) => state.setMap);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState("");
  const dialog = dialogKey ? DIALOG_DATA[dialogKey] : undefined;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Menubar {...props}>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setDialogKey("newMap")}>
              <DialogTrigger>New Map</DialogTrigger>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>Save Map</MenubarItem>
            <MenubarItem disabled>Load Map</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Recent maps</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem disabled>a map i done</MenubarItem>
                <MenubarItem disabled>cool map name</MenubarItem>
                <MenubarItem disabled>man made</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Example maps</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={async () =>
                    setMap((await import("@/maps/fort")).default)
                  }
                >
                  Fort
                </MenubarItem>
                <MenubarItem
                  onClick={async () =>
                    setMap((await import("@/maps/wall")).default)
                  }
                >
                  Wall
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem disabled>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>Settings</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled>Cut</MenubarItem>
            <MenubarItem disabled>Copy</MenubarItem>
            <MenubarItem disabled>Paste</MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>{" "}
      </Menubar>
      <DialogContent className="sm:max-w-[425px]">
        <DialogFormRenderer dialog={dialog} setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}
