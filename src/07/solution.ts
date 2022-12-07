import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

interface Node {
  name: string;
  size: number;
  children: Node[];
  parent?: Node;
}

const goToTop = (n: Node): Node => {
  if (n.parent) return goToTop(n.parent);
  return n;
};

const sum = (n: Node, acc: number): number => {
  const sz = sumNode(n);

  if (sz <= 100000) acc += sz;
  for (let c of n.children) {
    return sum(c, acc);
  }
  return acc;
};

let tot = 0;

const sumNode = (n: Node): number => {
  const v = n.size + n.children.reduce((p, c) => (p += sumNode(c)), 0);

  if (v <= 100000) tot += v;

  return v;
};

let smallest = 70000000;

const sumNode2 = (n: Node, thres: number): number => {
  const v = n.size + n.children.reduce((p, c) => (p += sumNode2(c, thres)), 0);

  if (v >= thres && v <= smallest) {
    smallest = v;
  }

  return v;
};

const parse = (data: string) => {
  const lines = data.split("\n");

  const tree = lines
    .filter((x) => x != "$ ls")
    .map((l) => l.replace("$ cd ", ""))
    .slice(1)
    .reduce(
      (p, c) => {
        if (c.startsWith("dir")) {
          p.children.push({
            name: c.split(" ")[1],
            size: 0,
            children: [],
            parent: p,
          });
        } else if (c.startsWith("..")) {
          return p.parent!;
        } else if (c.match(/^\d/)) {
          const size = Number(c.split(" ")[0]);
          p.size += size;
        } else {
          return p.children.find((x) => x.name === c)!;
        }

        return p;
      },
      { name: "/", size: 0, children: [] } as Node
    );
  return tree;
};

/* PART 1 */
const one = (data: string) => {
  const tree = parse(data);

  return sumNode(goToTop(tree));
};
readFile("input.txt", "utf-8").then((data) => {
  console.log(one(data));
  console.log(tot);
});
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const total = 70000000;
  const needed = 30000000;
  const tree = parse(data);
  const free = total - sumNode(goToTop(tree));
  const thres = needed - free;

  sumNode2(goToTop(tree), thres);
  console.log("smallest: ", smallest);
};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
