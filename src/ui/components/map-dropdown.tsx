import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu";
import { Button } from "@/ui/components/ui/button";
import { useStore } from "@/store";

import fort from "@/maps/fort.ts";
import wall from "@/maps/wall.ts";

const MAPS = [fort, wall];

export default function MapDropdown() {
  const store = useStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Select a map</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {MAPS.map((map) => (
          <DropdownMenuItem key={map.name} onClick={() => store.setMap(map)}>
            {map.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
