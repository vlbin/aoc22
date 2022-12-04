import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const overlap = (e1: number[], e2: number[]) =>
  (e1[0] <= e2[0] && e2[0] <= e1[1]) || (e2[0] <= e1[0] && e1[0] <= e2[1]);

const fullOverlap = (e1: number[], e2: number[]) =>
  (e1[0] <= e2[0] && e1[1] >= e2[1]) || (e2[0] <= e1[0] && e2[1] >= e1[1]);

const solve = (data: string, fn: (e1: number[], e2: number[]) => boolean) =>
  data
    .split("\n")
    .map((l) => l.split(",").map((e) => e.split("-").map(Number)))
    .reduce((prev, pair) => prev + (fn(pair[0], pair[1]) ? 1 : 0), 0);

/* PART 1 */
const one = (data: string) => solve(data, fullOverlap);
//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => solve(data, overlap);
//readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
