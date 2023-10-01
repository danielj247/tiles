import { useMemo, useState } from "react";
import { BoxIcon } from "lucide-react";
import { useStore } from "@/store";
import { Button } from "@/ui/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/ui/components/ui/tabs";

enum Tools {
  Components = "components",
}

export default function Toolbar() {
  const map = useStore((state) => state.map);
  const [selected, setSelected] = useState<Tools>();

  const data = useMemo(() => {
    if (!map) return [];

    const { src } = map.tileset;
    const keys = Object.keys(src);

    return keys.map((key) => {
      const north = src[key].north.src;

      return { name: key, image: north };
    });
  }, [map]);

  function toggleSelectedTool(tab: Tools) {
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
            className="w-14 h-14"
            title="Components"
            variant={selected === Tools.Components ? "secondary" : "default"}
            onClick={() => toggleSelectedTool(Tools.Components)}
          >
            <BoxIcon />
          </Button>
          {selected === Tools.Components && (
            <Tabs
              defaultValue="all"
              className="w-[400px] absolute left-16 top-0"
            >
              <TabsList>
                <TabsTrigger value="all" className="px-8">
                  All
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="w-full bg-zinc-100 rounded-lg p-2 flex flex-wrap justify-around gap-2 overflow-auto h-[80vh]">
                  {data.map((item) => (
                    <Button
                      key={item.name}
                      className="w-20 h-20 m-1 bg-contain bg-no-repeat bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </li>
      </ul>
    </div>
  );
}
