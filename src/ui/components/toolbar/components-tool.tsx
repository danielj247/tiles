import { useMemo } from "react";
import { BoxIcon } from "lucide-react";
import { useMapStore } from "@/stores/map";
import { useEditorStore } from "@/stores/editor";
import { Button } from "@/ui/components/ui/button";
import { cn } from "@/utils/general";
import { Tool } from "@/types/tool";

interface ComponentsToolProps {
  selected: boolean;
  toggleSelectedTool: (tab: Tool) => void;
}

export default function ComponentsTool(props: ComponentsToolProps) {
  const { selected, toggleSelectedTool } = props;
  const map = useMapStore((state) => state.map);

  const selectedComponent = useEditorStore(
    (state) => state.toolbar.components.selectedComponent,
  );

  const setSelectedComponent = useEditorStore(
    (state) => state.toolbar.components.setSelectedComponent,
  );

  const components = useMemo(() => {
    if (!map) return [];

    return Object.values(map.tileset.src);
  }, [map]);

  return (
    <>
      <Button
        className={cn("w-14 h-14", !selected && "text-white")}
        title="Components"
        variant={!selected ? "outline" : "secondary"}
        onClick={() => toggleSelectedTool(Tool.Components)}
      >
        <BoxIcon />
      </Button>
      {selected && (
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
    </>
  );
}
