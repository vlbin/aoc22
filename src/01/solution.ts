import { readFile } from "fs/promises";

const calories = (data: string) =>
  data.split("\n\n").map((elv) =>
    elv
      .split("\n")
      .map(Number)
      .reduce((prev, curr) => prev + curr, 0)
  );

/* PART 1 */
const one = (data: string) => Math.max(...calories(data));

readFile("input.txt", "utf-8").then((data) => console.log(one(data)));

const threemost = (arr: number[]) =>
  arr
    .sort((a, b) => b - a)
    .reduce((prev, curr, i) => (i > 2 ? prev : prev + curr), 0);

/* PART 2 */
const two = (data: string) => threemost(calories(data));

readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
