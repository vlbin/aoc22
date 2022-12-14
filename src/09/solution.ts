import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

type Direction = "R" | "U" | "L" | "D";

const visit = (visited: number[][], [x, y]: number[]) => {
  if (visited.findIndex(([a, b]) => a === x && b === y) === -1)
    visited.push([x, y]);

  return visited;
};

const calcPos = ([x, y]: number[], dir: Direction) => {
  const dirs: Record<Direction, number[]> = {
    U: [0, 1],
    D: [0, -1],
    L: [-1, 0],
    R: [1, 0],
  };
  return [x + dirs[dir][0], y + dirs[dir][1]];
};

const diff = (a: number, b: number) => (a === b ? 0 : a > b ? 1 : -1);

const getTailPos = ([headX, headY]: number[], [tailX, tailY]: number[]) => {
  return [tailX + diff(headX, tailX), tailY + diff(headY, tailY)];
};

const touching = ([headX, headY]: number[], [tailX, tailY]: number[]) => {
  return Math.abs(headX - tailX) <= 1 && Math.abs(headY - tailY) <= 1;
};

/* PART 1 */
const one = (data: string) => {
  const instrs = data.split("\n");
  let [headpos, tailpos] = [
    [0, 0],
    [0, 0],
  ];

  let tailLocations: number[][] = [[0, 0]];
  instrs.forEach((instr) => {
    const steps = Number(instr.split(" ")[1]);
    const dir = instr.split(" ")[0] as Direction;

    Array(steps)
      .fill(0)
      .forEach(() => {
        headpos = calcPos(headpos, dir);
        if (!touching(headpos, tailpos)) {
          tailpos = getTailPos(headpos, tailpos);
          tailLocations = visit(tailLocations, tailpos);
        }
      });
  });

  return tailLocations.length;
};
//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const instrs = data.split("\n");
  const rope = Array(10).fill([0, 0]) as number[][];
  let tailLocations: number[][] = [[0, 0]];
  instrs.forEach((instr) => {
    const steps = Number(instr.split(" ")[1]);
    const dir = instr.split(" ")[0] as Direction;

    Array(steps)
      .fill(0)
      .forEach((_) => {
        rope.forEach((_, i) => {
          if (i === 0) {
            rope[i] = calcPos(rope[i], dir);
          } else {
            if (!touching(rope[i - 1], rope[i])) {
              rope[i] = getTailPos(rope[i - 1], rope[i]);
            }
            if (i === rope.length - 1) {
              tailLocations = visit(tailLocations, rope[i]);
            }
          }
        });
      });
  });

  return tailLocations.length;
};
//readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
