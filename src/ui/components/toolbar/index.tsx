import { useStore } from "@/store";
import ComponentsTool from "@/ui/components/toolbar/components-tool";
import SelectTool from "@/ui/components/toolbar/select-tool";
import { Tool } from "@/types/editor";
import DeleteTool from "./delete-tool";

export default function Toolbar() {
  const selectedTool = useStore((state) => state.editor.toolbar.selectedTool);
  const setSelectedTool = useStore(
    (state) => state.editor.toolbar.setSelectedTool,
  );

  function toggleSelectedTool(tab: Tool) {
    if (selectedTool === tab) {
      setSelectedTool(undefined);
      return;
    }

    setSelectedTool(tab);
  }

  return (
    <div>
      <ul className="ml-4 flex flex-col gap-y-2">
        <li className="relative">
          <SelectTool
            selected={selectedTool === Tool.Select}
            toggleSelectedTool={toggleSelectedTool}
          />
        </li>
        <li className="relative">
          <ComponentsTool
            selected={selectedTool === Tool.Components}
            toggleSelectedTool={toggleSelectedTool}
          />
        </li>
        <li className="relative">
          <DeleteTool
            selected={selectedTool === Tool.Delete}
            toggleSelectedTool={toggleSelectedTool}
          />
        </li>
      </ul>
    </div>
  );
}
