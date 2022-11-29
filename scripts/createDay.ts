import { mkdirSync, writeFileSync } from "fs";

const day = process.argv[2];

mkdirSync(`src/${day}`);
writeFileSync(`src/${day}/input.txt`, "");
writeFileSync(`src/${day}/part1.ts`, "");
writeFileSync(`src/${day}/part2.ts`, "");
