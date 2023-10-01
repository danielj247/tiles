import { useStore } from "@/store";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Toolbar from "./components/toolbar";
import MenuBar from "./components/menu-bar";

export default function App() {
  const selectedMap = useStore((state) => state.map);

  return (
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
      <Toolbar />
    </div>
  );
}
