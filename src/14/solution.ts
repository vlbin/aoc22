import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const pairs = (arr: unknown[]) => {};

type Path = {
  start: number[];
  end: number[];
};

const parse = (structs: string) => {
  const parsed = structs.split("\n").map((struct) => {
    return struct.split(" -> ").map((x) => x.split(",").map(Number));
  });

  const ret = parsed.flatMap((line) => {
    return line
      .flatMap(([x1, y1], i, arr) => {
        if (!arr[i + 1]) return [[x1, y1]];

        const [x2, y2] = [...arr[i + 1]];
        if (x1 === x2) {
          //x range
          const [ymin, ymax] = y1 < y2 ? [y1, y2] : [y2, y1];

          return Array(ymax - ymin + 1)
            .fill(0)
            .map((_, i) => [x1, ymin + i]);
        } else {
          //y range
          const [xmin, xmax] = x1 < x2 ? [x1, x2] : [x2, x1];
          return Array(xmax - xmin + 1)
            .fill(0)
            .map((_, i) => [xmin + i, y1]);
        }
      })
      .filter(
        (x, i, arr) =>
          arr.findIndex((y) => x[0] === y[0] && x[1] === y[1]) === i
      );
  });

  return ret;
};

const isDownFree = (structs: number[][], [x, y]: number[]) =>
  structs.findIndex(([x2, y2]) => x2 === x && y2 === y + 1) === -1;

const isLeftFree = (structs: number[][], [x, y]: number[]) =>
  structs.findIndex(([x2, y2]) => x2 === x - 1 && y2 === y + 1) === -1;

const isRightFree = (structs: number[][], [x, y]: number[]) =>
  structs.findIndex(([x2, y2]) => x2 === x + 1 && y2 === y + 1) === -1;

const isFreeFalling = (structs: number[][], [x, y]: number[]) =>
  y >= Math.max(...structs.map(([x, y]) => y));

const isBlocked = (structs: number[][]) =>
  structs[structs.length - 1][0] === 500 &&
  structs[structs.length - 1][1] === 0;

const fallFree = (
  structs: number[][],
  [x, y]: number[],
  flakes: number
): number => {
  while (!isFreeFalling(structs, [x, y])) {
    if (isDownFree(structs, [x, y])) {
      y += 1;
    } else if (isLeftFree(structs, [x, y])) {
      x -= 1;
      y += 1;
    } else if (isRightFree(structs, [x, y])) {
      x += 1;
      y += 1;
    } else {
      structs.push([x, y]);
      flakes += 1;
      x = 500;
      y = 0;
    }
  }

  return flakes;
};

const fallWithFloor = (
  structs: number[][],
  [x, y]: number[],
  flakes: number,
  floorLevel: number
): number => {
  while (!isBlocked(structs)) {
    if (isDownFree(structs, [x, y]) && y < floorLevel - 1) {
      y += 1;
    } else if (isLeftFree(structs, [x, y]) && y < floorLevel - 1) {
      x -= 1;
      y += 1;
    } else if (isRightFree(structs, [x, y]) && y < floorLevel - 1) {
      x += 1;
      y += 1;
    } else {
      structs.push([x, y]);
      flakes += 1;
      [x, y] = [x, y - 2];
    }
  }

  return flakes;
};

/* PART 1 */
const one = (data: string) => {
  const covered = parse(data);
  let ret = fallFree(covered, [500, 0], 0);

  return ret;
};
readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const covered = parse(data);
  let ret = fallWithFloor(
    covered,
    [500, 0],
    0,
    Math.max(...covered.map(([_, y]) => y)) + 2
  );

  return ret;
};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
