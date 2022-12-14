import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

/* PART 1 */
const one = (data: string) => {
  let cycles = 0;
  let x = 1;
  let tot = 0;
  data.split("\n").forEach((instr) => {
    const [op, val] = instr.split(" ");
    cycles += 1;
    if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
      tot += x * cycles;
      console.log(x, cycles);
    }

    if (val !== undefined) {
      cycles += 1;
      if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
        tot += x * cycles;
      }
      x += Number(val);
    }
  });
  return tot;
};
//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  let cycles = 0;
  let x = 1;
  const matrix: string[][] = [[]];
  let idx = 0;
  data.split("\n").forEach((instr) => {
    const [_, val] = instr.split(" ");
    cycles += 1;
    if (cycles > 1 && cycles % 40 === 1) {
      matrix.push([]);
      idx += 1;
    }

    if ([x - 1, x, x + 1].includes(matrix[idx].length)) {
      matrix[idx].push("#");
    } else {
      matrix[idx].push(".");
    }

    if (val !== undefined) {
      cycles += 1;
      if (cycles > 1 && cycles % 40 === 1) {
        matrix.push([]);
        idx += 1;
      }
      if ([x - 1, x, x + 1].includes(matrix[idx].length)) {
        matrix[idx].push("#");
      } else {
        matrix[idx].push(".");
      }

      x += Number(val);
    }
  });
  return matrix.map((l) => l.join("")).join("\n");
};
//readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
