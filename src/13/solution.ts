import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

type RecursiveInteger = number | RecursiveInteger[];

const comparePackets = (
  [l, ...lr]: RecursiveInteger[],
  [r, ...rr]: RecursiveInteger[]
): number => {
  if (l === undefined && r !== undefined) {
    return -1;
  } else if (l !== undefined && r === undefined) {
    return 1;
  } else if (Number.isInteger(l) && Number.isInteger(r)) {
    if (l < r) {
      return -1;
    } else if (l > r) {
      return 1;
    } else {
      return comparePackets(lr, rr);
    }
  } else if (Array.isArray(l) && Array.isArray(r)) {
    const x = comparePackets(l, r);
    return x === 0 ? comparePackets(lr, rr) : x;
  } else if (Array.isArray(l) && Number.isInteger(r)) {
    return comparePackets([l, ...lr], [[r], ...rr]);
  } else if (Array.isArray(r) && Number.isInteger(l)) {
    return comparePackets([[l], ...lr], [r, ...rr]);
  }
  return 0;
};

/* PART 1 */
const one = (data: string) => {
  return data
    .split("\n\n")
    .map((packetPair, i) => {
      const [p1, p2] = packetPair.split("\n");
      const ret = comparePackets(
        JSON.parse(p1) as RecursiveInteger[],
        JSON.parse(p2) as RecursiveInteger[]
      );

      return ret < 0 ? i + 1 : 0;
    })
    .reduce((p, c) => p + c, 0);
};
//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const dividers = ["[[2]]", "[[6]]"];
  return data
    .split("\n")
    .filter((l) => l !== "")
    .concat(...dividers)
    .map((x) => JSON.parse(x) as RecursiveInteger[])
    .sort(comparePackets)
    .reduce(
      (p, c, i) => p * (dividers.includes(JSON.stringify(c)) ? i + 1 : 1),
      1
    );
};
//readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
