import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = path.dirname(FILE_NAME);

const OUTPUT_DIR = path.join(DIR_NAME, "../src/tilesets");

const TILE_SET_DIR = path.join(DIR_NAME, "../src/img/tileset");
const FOLDERS = fs.readdirSync(TILE_SET_DIR);

function rotationInitialToName(initial: string) {
  switch (initial) {
    case "N":
      return "north";
    case "E":
      return "east";
    case "S":
      return "south";
    case "W":
      return "west";
    default:
      throw new Error(`Invalid rotation initial: ${initial}`);
  }
}

for (let i = 0; i < FOLDERS.length; i++) {
  let fileContent = "";

  const folder = FOLDERS[i];
  const output = path.join(OUTPUT_DIR, `${folder}.ts`);
  const files = fs.readdirSync(path.join(TILE_SET_DIR, folder));
  const tileSet = {};

  for (let q = 0; q < files.length; q++) {
    const file = files[q];
    const [name, rotation] = file.replace(/.png/, "").split("_");
    const rotationName = rotationInitialToName(rotation);

    if (tileSet[name]) {
      tileSet[name][rotationName] = file;
    } else {
      tileSet[name] = { [rotationName]: file };
    }

    fileContent += `import ${name}_${rotation} from "@/img/tileset/${folder}/${file}";\n`;
    fileContent += `const ${name}_${rotation}_PNG = new Image();\n`;
    fileContent += `${name}_${rotation}_PNG.src = ${name}_${rotation};\n`;
    fileContent += "\n";
  }

  fileContent += "export default {\n";

  Object.entries(tileSet).forEach(([name, rotations]) => {
    fileContent += `  ${name}: {\n`;
    fileContent += `    name: "${name}",\n`;

    Object.entries(rotations).forEach(([rotation]) => {
      const rot = rotation.substring(0, 1).toUpperCase();
      fileContent += `    ${rotation}: ${name}_${rot}_PNG,\n`;
    });

    fileContent += "  },\n";
  });

  fileContent += "};\n";

  fs.writeFileSync(output, fileContent);

  console.log("========================================");
  console.log(`Generated tileset "${folder}"`);
  console.log(`Find it at ${output}`);
  console.log("========================================");
}
