import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const prio = (x: string) => {
  const ret = x.charCodeAt(0) - 96 + (x.match(/^[A-Z]/) ? 58 : 0);
  return ret;
};

/* PART 1 */
const one = (data: string) => {
  return data
    .split("\n")
    .map((comp) => {
      const l = comp.length;
      const fst = comp.slice(0, l / 2 + 1).split("");
      const last = comp.slice(l / 2, l).split("");
      const x = fst.find((x) => last.includes(x))!;
      return prio(x);
    })
    .reduce((p, c) => p + c, 0);
};
//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  return data
    .split("\n")
    .reduce((p, c, i) => {
      if (i % 3 === 0) return p.concat([[c]]);
      else {
        p[p.length - 1].push(c);
        return [...p];
      }
    }, [] as string[][])
    .map(
      (group) =>
        group[0]
          .split("")
          .find((c) => group[1].includes(c) && group[2].includes(c))!
    )

    .reduce((p, c) => p + prio(c), 0);
};
//readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
