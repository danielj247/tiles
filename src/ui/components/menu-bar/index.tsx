import { useState } from "react";
import { MenubarProps } from "@radix-ui/react-menubar";
import { getStore, useStore } from "@/store";
import * as tilesets from "@/tilesets";
import { Map } from "@/types/map";
import { saveMap, loadMap } from "@/utils/map";
import { getTilesets } from "@/utils/tilesets";
import { Tileset } from "@/types/tileset";
import { DialogFormData, FormComponent } from "@/types/dialog-form";
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
import { DIALOG_DATA } from "@/consts/menu-bar";

export default function MenuBar(props: MenubarProps) {
  const map = useStore((state) => state.map);
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
            <MenubarItem
              disabled={!map}
              onClick={() => {
                if (!map) return;

                saveMap(map);
              }}
            >
              Save Map
            </MenubarItem>
            <MenubarItem onClick={loadMap}>Load Map</MenubarItem>
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
