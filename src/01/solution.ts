import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const calories = (data: string) =>
  data
    .split("\n\n")
    .map((elv) =>
      elv.split("\n").reduce((prev, curr) => prev + Number(curr), 0)
    );

/* PART 1 */
const one = (data: string) => calories(data).sort((a, b) => b - a)[0];

readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

const threemost = (arr: number[]) =>
  arr
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prev, curr) => prev + curr, 0);

/* PART 2 */
const two = (data: string) => threemost(calories(data));

readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
