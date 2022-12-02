import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

const opp = ["A", "B", "C"];
const me = ["X", "Y", "Z"];
const scores = [3, 6, 0];

const parse = (data: string) =>
  data.split("\n").map((r) => ({
    opp: r.split(" ")[0],
    me: r.split(" ")[1],
  }));

const score = (o: string, m: string) =>
  me.indexOf(m) + 1 + scores[(me.indexOf(m) - opp.indexOf(o) + 3) % 3];

const decis = (o: string, m: string) =>
  me[(opp.indexOf(o) + me.indexOf(m) + 2) % 3];

/* PART 1 */
const one = (data: string) =>
  parse(data)
    .map((r) => score(r.opp, r.me))
    .reduce((p, c) => p + c, 0);

readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) =>
  parse(data)
    .map((r) => score(r.opp, decis(r.opp, r.me)))
    .reduce((p, c) => p + c, 0);

readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
