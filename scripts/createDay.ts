import { copyFileSync, mkdirSync, writeFileSync } from "fs";

const day = process.argv[2];

mkdirSync(`src/${day}`);
writeFileSync(`src/${day}/input.txt`, "");
copyFileSync(`src/template/solution.ts`, `src/${day}/solution.ts`);
