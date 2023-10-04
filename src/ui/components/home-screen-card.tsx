import { FilePlusIcon, FileUpIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import DialogFormRenderer from "@/ui/components/menu-bar/dialog-form-renderer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/ui/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/ui/components/ui/dialog";
import { loadMap } from "@/utils/map";
import { DIALOG_DATA } from "@/consts/menu-bar";
import { useMemo } from "react";

const GREETINGS = ["Hello", "Hi", "Welcome", "Howdy", "Greetings"];
const NAME = ["friend", "buddy", "pal", "dude"];

function getGreeting() {
  const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  const name = NAME[Math.floor(Math.random() * NAME.length)];

  return `${greeting}, ${name}!`;
}

export default function HomeScreenCard() {
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{greeting}</CardTitle>
        <CardDescription>
          <p className="mt-2">
            Welcome to <span className="font-semibold">tiles</span>, I hope you enjoy using it!
          </p>
          <p className="mt-2">
            The project is under constant development and is very unstable, so saved maps may not be compatible with
            future versions.
          </p>
          <p className="mt-2">
            Use{" "}
            <span className="bg-black text-white font-semibold h-7 w-7 inline-flex justify-center items-center rounded-md ml-0.5">
              W
            </span>{" "}
            <span className="bg-black text-white font-semibold h-7 w-7 inline-flex justify-center items-center rounded-md ml-0.5">
              A
            </span>{" "}
            <span className="bg-black text-white font-semibold h-7 w-7 inline-flex justify-center items-center rounded-md ml-0.5">
              S
            </span>{" "}
            <span className="bg-black text-white font-semibold h-7 w-7 inline-flex justify-center items-center rounded-md mx-0.5">
              D
            </span>{" "}
            to move the camera
          </p>
          <ul className="flex flex-col gap-y-2 mt-3">
            <li>
              <a href="https://github.com/danielj247/tiles" target="_blank" className="text-black">
                <GitHubLogoIcon className="inline" /> <span className="underline">GitHub project</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/danielj247" target="_blank" className="text-black">
                <GitHubLogoIcon className="inline" /> <span className="underline">@danielj247</span>
              </a>
            </li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <div
              role="button"
              className="cursor-pointer flex items-center space-x-4 rounded-md border p-4 hover:bg-black hover:text-white group transition-colors"
            >
              <FilePlusIcon />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Create a new map</p>
                <p className="text-sm text-zinc-500 group-hover:text-white transition-colors">
                  Start building your map from scratch
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogFormRenderer dialog={DIALOG_DATA.newMap} />
          </DialogContent>
        </Dialog>
        <div
          role="button"
          onClick={loadMap}
          className="cursor-pointer flex items-center space-x-4 rounded-md border p-4 hover:bg-black hover:text-white group transition-colors"
        >
          <FileUpIcon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Load a map</p>
            <p className="text-sm text-zinc-500 group-hover:text-white transition-colors">
              Continue working on a different masterpiece
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
