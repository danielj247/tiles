import { useStore } from "@/store";
import MapDropdown from "@/ui/components/map-dropdown";
import { Button } from "@/ui/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function App() {
  const selectedMap = useStore((state) => state.map);

  return (
    <div className="fixed top-0 left-0 w-screen">
      <header className="flex justify-center pt-2">
        <div className="absolute top-2 left-2">
          <Button variant="secondary">New</Button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <a href="https://github.com/danielj247/tiles" target="_blank">
            <h1 className="text-white text-xl flex items-center">
              tiles.
              <GitHubLogoIcon className="ml-2 w-5 h-5" />
            </h1>
          </a>
          {selectedMap && (
            <p className="text-white mt-3">
              Selected map:{" "}
              <span className="bg-pink-600 py-1 px-2 ml-1 rounded">
                {selectedMap.name}
              </span>
            </p>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <MapDropdown />
        </div>
      </header>
    </div>
  );
}
