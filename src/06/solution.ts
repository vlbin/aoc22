import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const readPacket = (arr: string[], nChars: number) =>
  arr.findIndex(
    (c, i, arr) => new Set(arr.slice(i, i + nChars)).size === nChars
  ) + nChars;

/* PART 1 */
const one = (data: string) => readPacket(data.split(""), 4);
//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => readPacket(data.split(""), 14);
//readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
