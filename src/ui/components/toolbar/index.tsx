import { useMemo, useState } from "react";
import { BoxIcon } from "lucide-react";
import { useStore } from "@/store";
import { cn } from "@/utils/general";
import { Button } from "@/ui/components/ui/button";
import { Tool } from "@/types/editor";

export default function Toolbar() {
  const map = useStore((state) => state.map);

  const selectedComponent = useStore(
    (state) => state.editor.toolbar.selectedComponent,
  );

  const setSelectedComponent = useStore(
    (state) => state.editor.toolbar.setSelectedComponent,
  );

  const [selected, setSelected] = useState<Tool>();

  const components = useMemo(() => {
    if (!map) return [];

    return Object.values(map.tileset.src);
  }, [map]);

  function toggleSelectedTool(tab: Tool) {
    if (selected === tab) {
      setSelected(undefined);
      return;
    }

    setSelected(tab);
  }

  return (
    <div>
      <ul className="ml-4">
        <li className="relative">
          <Button
            className={cn(
              "w-14 h-14",
              selected === Tool.Components && "text-white",
            )}
            title="Components"
            variant={selected === Tool.Components ? "outline" : "secondary"}
            onClick={() => toggleSelectedTool(Tool.Components)}
          >
            <BoxIcon />
          </Button>
          {selected === Tool.Components && (
            <div
              className={cn(
                "w-[400px] absolute left-16 top-0 bg-zinc-100 rounded-lg p-2 flex flex-wrap justify-around gap-2 overflow-auto h-[80vh] transition-all duration-300",
                selectedComponent && "h-14 w-14 p-0 m-0",
              )}
            >
              {!selectedComponent &&
                components.map((item) => (
                  <Button
                    key={item.name}
                    className="w-20 h-20 m-1 bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${item.north.src})` }}
                    onClick={() => setSelectedComponent(item)}
                  />
                ))}

              {selectedComponent && (
                <Button
                  variant="secondary"
                  className="w-full h-full bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${selectedComponent.north.src})`,
                  }}
                  onClick={() => setSelectedComponent(undefined)}
                />
              )}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
