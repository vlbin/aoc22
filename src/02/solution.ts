import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const beats: Record<string, string> = {
  X: "C",
  Y: "A",
  Z: "B",
};

const eq: Record<string, string> = {
  X: "A",
  Y: "B",
  Z: "C",
};

const beat: Record<string, string> = {
  A: "Y",
  B: "Z",
  C: "X",
};

const draw: Record<string, string> = {
  A: "X",
  B: "Y",
  C: "Z",
};

const loseTo: Record<string, string> = {
  A: "Z",
  B: "X",
  C: "Y",
};

const decis = (opp: string, dec: string): string => {
  return dec === "X" ? loseTo[opp] : dec === "Y" ? draw[opp] : beat[opp];
};

const scoreMap: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

/* PART 1 */
const one = (data: string) => {
  const rounds = data.split("\n").map((r) => ({
    opp: r.split(" ")[0],
    me: r.split(" ")[1],
  }));

  const score = rounds
    .map((r) => {
      const score =
        r.opp === beats[r.me]
          ? 6 + scoreMap[r.me]
          : eq[r.me] === r.opp
          ? 3 + scoreMap[r.me]
          : scoreMap[r.me];

      return score;
    })
    .reduce((p, c) => p + c, 0);

  return score;
};
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const rounds = data.split("\n").map((r) => ({
    opp: r.split(" ")[0],
    me: r.split(" ")[1],
  }));

  const score = rounds
    .map((r) => {
      const mydecis = decis(r.opp, r.me);

      const score =
        r.me === "X"
          ? scoreMap[mydecis]
          : r.me === "Y"
          ? scoreMap[mydecis] + 3
          : scoreMap[mydecis] + 6;

      return score;
    })
    .reduce((p, c) => p + c, 0);

  return score;
};
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
