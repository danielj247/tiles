import { MousePointer } from "lucide-react";
import { Tool } from "@/types/editor";
import { cn } from "@/utils/general";
import { Button } from "@/ui/components/ui/button";

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
