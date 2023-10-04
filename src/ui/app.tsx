import { Rotate3DIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useMapStore } from "@/stores/map";
import { useControlsStore } from "@/stores/controls";
import { useEditorStore } from "@/stores/editor";
import Toolbar from "@/ui/components/toolbar";
import MenuBar from "@/ui/components/menu-bar";
import { Button } from "@/ui/components/ui/button";
import HomeScreenCard from "@/ui/components/home-screen-card";
import { Rotation } from "@/types/rotation";
import { Tool } from "@/types/tool";

export default function App() {
  const selectedMap = useMapStore((state) => state.map);

  const mousePos = useControlsStore((state) => state.mouse.position);

  const selectedTool = useEditorStore((state) => state.toolbar.selectedTool);

  const hoveredEnts = useEditorStore((state) => state.toolbar.select.hoveredEntities);

  const rotation = useEditorStore((state) => state.toolbar.components.selectedComponentRotation);

  const setRotation = useEditorStore((state) => state.toolbar.components.setSelectedComponentRotation);

  const isSelectTool = selectedTool === Tool.Select;
  const isComponentsTool = selectedTool === Tool.Components;

  function updateRotation() {
    switch (rotation) {
      case Rotation.NORTH:
        setRotation(Rotation.EAST);
        break;
      case Rotation.EAST:
        setRotation(Rotation.SOUTH);
        break;
      case Rotation.SOUTH:
        setRotation(Rotation.WEST);
        break;
      case Rotation.WEST:
        setRotation(Rotation.NORTH);
        break;
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen">
        <header className="flex justify-center pt-2">
          <MenuBar className="absolute left-4 top-4" />
          <div className="flex flex-col items-center justify-center">
            <a href="https://github.com/danielj247/tiles" target="_blank">
              <h1 className="text-white text-xl flex items-center">
                tiles.
                <GitHubLogoIcon className="ml-2 w-5 h-5" />
              </h1>
            </a>
            {selectedMap && <p className="bg-pink-600 py-1 px-2 ml-1 rounded text-white mt-5">{selectedMap.name}</p>}
          </div>
        </header>
      </div>

      {!selectedMap && (
        <div className="flex justify-center items-center w-full absolute top-52 left-0">
          <HomeScreenCard />
        </div>
      )}

      {selectedMap && (
        <div className="absolute left-0 top-20">
          <Toolbar />
        </div>
      )}

      {isComponentsTool && (
        <Button
          onClick={updateRotation}
          variant="outline"
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-white bg-zinc-900/50 group"
        >
          Rotate
          <Rotate3DIcon className="stroke-white ml-2 group-hover:stroke-black transition-colors" />
        </Button>
      )}

      {isSelectTool && selectedMap && (
        <div className="absolute p-2 bottom-4 right-4 text-white bg-zinc-900/50 text-center flex flex-col gap-y-2">
          <p>x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y</p>
          <p>
            {mousePos.x}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mousePos.y}
          </p>
          <hr />
          <p>
            {hoveredEnts?.length || 0} {hoveredEnts?.length === 1 ? "entity" : "entities"}
          </p>
          {hoveredEnts && hoveredEnts.length > 0 && <hr />}
          {hoveredEnts?.map((ent) => <p key={ent.id}>{ent.id}</p>)}
        </div>
      )}
    </>
  );
}
