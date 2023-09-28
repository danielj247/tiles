import { createRoot } from "react-dom/client";
import App from "@/ui/app";

const ui = document.getElementById("ui");

if (!ui) {
  throw new Error("Couldn't find #ui element");
}

createRoot(ui).render(<App />);
