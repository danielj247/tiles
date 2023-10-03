import { MousePointer } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { cn } from "@/utils/general";
import { Tool } from "@/types/tool";

interface SelectToolProps {
  selected: boolean;
  toggleSelectedTool: (tab: Tool) => void;
}

export default function SelectTool(props: SelectToolProps) {
  const { selected, toggleSelectedTool } = props;

  return (
    <Button
      className={cn("w-14 h-14", !selected && "text-white")}
      title="Select tool"
      variant={!selected ? "outline" : "secondary"}
      onClick={() => toggleSelectedTool(Tool.Select)}
    >
      <MousePointer />
    </Button>
  );
}
