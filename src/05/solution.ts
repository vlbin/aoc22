import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const parseCrates = (input: string) => {
  const lines = input.split("\n\n")[0].split("\n");
  const data = lines
    .map((line) => {
      return line
        .split("")
        .map((c, i, cs) => {
          if (i % 4 === 1) {
            return c.length ? c : "empty";
          }
          return "";
        })
        .filter((x) => x != "");
    })
    .filter((x) => !x.includes("1"));
  const crates = data[0]
    .map((_, ci) => data.map((r) => r[ci]))
    .map((x) => x.filter((x) => x != " "));

  return crates;
};

const parseInstr = (input: string) => {
  return input
    .split("\n\n")[1]
    .split("\n")
    .map((instr) =>
      instr
        .split(" ")
        .filter((x, i) => i % 2 === 1)
        .map(Number)
    )
    .map((l) => ({
      n: l[0],
      from: l[1],
      to: l[2],
    }));
};

const take = <T>(list: T[], n: number) => {
  return list.splice(0, n);
};

/* PART 1 */
const one = (data: string) => {
  const crates = parseCrates(data);
  const instrs = parseInstr(data);

  instrs.forEach((instr, i) => {
    Array(instr.n)
      .fill(0)
      .forEach(() => {
        crates[instr.to - 1].unshift(crates[instr.from - 1].shift()!);
      });
  });
  return crates.map((x) => x[0]).join("");
};
readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const crates = parseCrates(data);
  const instrs = parseInstr(data);

  instrs.forEach((instr, i) => {
    console.log(crates);

    crates[instr.to - 1].unshift(...take(crates[instr.from - 1], instr.n));
  });
  return crates.map((x) => x[0]).join("");
};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
