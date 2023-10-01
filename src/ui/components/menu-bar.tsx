import { useStore } from "@/store";
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
import { MenubarProps } from "@radix-ui/react-menubar";

export default function MenuBar(props: MenubarProps) {
  const setMap = useStore((state) => state.setMap);

  return (
    <Menubar {...props}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Map <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save Map <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Load Map <MenubarShortcut>⌘L</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Recent maps</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>a map i done</MenubarItem>
              <MenubarItem>cool map name</MenubarItem>
              <MenubarItem>man made</MenubarItem>
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
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Settings</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo change <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo change <MenubarShortcut>⌘⇧Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
