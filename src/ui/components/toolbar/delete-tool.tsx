import { TrashIcon } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { cn } from "@/utils/general";
import { Tool } from "@/types/tool";

interface DeleteTool {
  selected: boolean;
  toggleSelectedTool: (tab: Tool) => void;
}

export default function DeleteTool(props: DeleteTool) {
  const { selected, toggleSelectedTool } = props;

  return (
    <Button
      className={cn("w-14 h-14", !selected && "text-white")}
      title="Select tool"
      variant={!selected ? "outline" : "secondary"}
      onClick={() => toggleSelectedTool(Tool.Delete)}
    >
      <TrashIcon />
    </Button>
  );
}
