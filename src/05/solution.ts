import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const transpose = <T>(matrix: T[][]) =>
  matrix[0].map((_, ci) => matrix.map((r) => r[ci]));

const parseCrates = (input: string) => {
  const lines = input.split("\n\n")[0].split("\n");
  const data = lines
    .map((line) => {
      return line
        .split("")
        .map((c, i) => (i % 4 === 1 ? c : ""))
        .filter((x) => x.length);
    })
    .slice(0, -1);

  return transpose(data).map((x) => x.filter((x) => x != " "));
};

const parseInstr = (input: string) => {
  return input
    .split("\n\n")[1]
    .split("\n")
    .map((instr) =>
      instr
        .split(" ")
        .filter((_, i) => i % 2 === 1)
        .map(Number)
    )
    .map(([n, from, to]) => ({
      n,
      from,
      to,
    }));
};

/* PART 1 */
const one = (data: string) => {
  const crates = parseCrates(data);
  const instrs = parseInstr(data);

  instrs.forEach((instr) => {
    crates[instr.to - 1].unshift(
      ...crates[instr.from - 1].splice(0, instr.n).reverse()
    );
  });
  return crates.map((x) => x[0]).join("");
};

//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const crates = parseCrates(data);
  const instrs = parseInstr(data);

  instrs.forEach((instr) => {
    crates[instr.to - 1].unshift(...crates[instr.from - 1].splice(0, instr.n));
  });
  return crates.map((x) => x[0]).join("");
};

//readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
