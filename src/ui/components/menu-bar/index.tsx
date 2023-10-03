import { useState } from "react";
import { MenubarProps } from "@radix-ui/react-menubar";
import { useMapStore } from "@/stores/map";
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
import { saveMap, loadMap, parseMapFile } from "@/utils/map";
import { MapFile } from "@/types/map";
import { DIALOG_DATA } from "@/consts/menu-bar";

export default function MenuBar(props: MenubarProps) {
  const map = useMapStore((state) => state.map);
  const setMap = useMapStore((state) => state.setMap);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState("");
  const dialog = dialogKey ? DIALOG_DATA[dialogKey] : undefined;

  async function loadLocalMap(mapFile: MapFile) {
    if (!mapFile) return;

    const parsedMap = await parseMapFile(mapFile as unknown as MapFile);

    if (!parsedMap) return;

    setMap(parsedMap);
  }

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
                  onClick={async () => {
                    const mapFile = await import("@/maps/tiles.json");
                    loadLocalMap(mapFile as unknown as MapFile);
                  }}
                >
                  tiles.
                </MenubarItem>
                <MenubarItem
                  onClick={async () => {
                    const mapFile = await import("@/maps/fort.json");
                    loadLocalMap(mapFile as unknown as MapFile);
                  }}
                >
                  fort
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
