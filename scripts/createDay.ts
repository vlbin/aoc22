import { mkdirSync, writeFileSync } from "fs";

const day = process.argv[2];

mkdirSync(`src/${day}`);
writeFileSync(`src/${day}/input.txt`, "");
writeFileSync(`src/${day}/solution.ts`, "");
