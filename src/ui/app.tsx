import { Rotate3DIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/ui/components/ui/button";
import Toolbar from "@/ui/components/toolbar";
import MenuBar from "@/ui/components/menu-bar";
import { Rotation } from "@/types/rotation";
import { useStore } from "@/store";

export default function App() {
  const selectedMap = useStore((state) => state.map);

  const selectedComponent = useStore(
    (state) => state.editor.toolbar.selectedComponent,
  );

  const setRotation = useStore(
    (state) => state.editor.toolbar.setSelectedComponentRotation,
  );

  const rotation = useStore(
    (state) => state.editor.toolbar.selectedComponentRotation,
  );

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
            {selectedMap && (
              <p className="bg-pink-600 py-1 px-2 ml-1 rounded text-white mt-5">
                {selectedMap.name}
              </p>
            )}
          </div>
        </header>
      </div>
      {selectedMap && (
        <div className="absolute left-0 top-20">
          <Toolbar />
        </div>
      )}
      {selectedComponent && (
        <Button
          onClick={updateRotation}
          variant="outline"
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-white bg-zinc-900/50 group"
        >
          Rotate
          <Rotate3DIcon className="stroke-white ml-2 group-hover:stroke-black transition-colors" />
        </Button>
      )}
    </>
  );
}
