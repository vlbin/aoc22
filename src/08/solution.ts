import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const aboveLower = (li: number, ci: number, matrix: number[][]) => {
  let valid = true;
};

/* PART 1 */
const one = (data: string) => {
  return data
    .split("\n")
    .map((l) => l.split("").map(Number))
    .reduce((pl, cl, li, matrix) => {
      return (
        pl +
        cl.reduce((pc, cc, ci, line) => {
          if (
            ci === 0 ||
            ci === line.length - 1 ||
            li === 0 ||
            li === matrix.length - 1 ||
            line.slice(0, ci).every((x) => x < cc) ||
            line.slice(ci + 1).every((x) => x < cc) ||
            matrix.slice(0, li).every((x) => x[ci] < cc) ||
            matrix.slice(li + 1).every((x) => x[ci] < cc)
          ) {
            return pc + 1;
          }
          return pc;
        }, 0)
      );
    }, 0);
};
readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

const column = (ci: number, matrix: number[][]) =>
  matrix.map((l) => l.filter((_, i) => i === ci)).flat();

const columnUp = (li: number, ci: number, matrix: number[][]) => {
  return column(ci, matrix).slice(0, li).reverse();
};

const columnDown = (li: number, ci: number, matrix: number[][]) =>
  column(ci, matrix).slice(li + 1);

const row = (li: number, matrix: number[][]) => matrix[li];

const rowLeft = (li: number, ci: number, matrix: number[][]) =>
  row(li, matrix).slice(0, ci).reverse();

const rowRight = (li: number, ci: number, matrix: number[][]) =>
  row(li, matrix).slice(ci + 1);

const view = (height: number, arr: number[]) => {
  return (
    arr.slice(
      0,
      arr.findIndex((x) => x >= height)
    ).length + 1
  );
};

/* PART 2 */
const two = (data: string) => {
  return data
    .split("\n")
    .map((l) => l.split("").map(Number))
    .reduce((prevScore, line, li, matrix) => {
      return Math.max(
        prevScore,
        line.reduce((prevCol, c, ci, line) => {
          let val;
          if (
            ci === 0 ||
            ci === line.length - 1 ||
            li === 0 ||
            li === matrix.length - 1
          ) {
            val = 0;
          }
          val =
            view(c, columnUp(li, ci, matrix)) *
            view(c, columnDown(li, ci, matrix)) *
            view(c, rowLeft(li, ci, matrix)) *
            view(c, rowRight(li, ci, matrix));
          return Math.max(prevCol, val);
        }, 0)
      );
    }, 0);
};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
