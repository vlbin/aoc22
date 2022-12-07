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

const size = (n: Node): number => {
  return n.size + n.children.reduce((p, c) => (p += size(c)), 0);
};

const getSizeBelow = (n: Node) => {
  let tot = 0;

  const traverse = (n: Node): number => {
    const v = n.size + n.children.reduce((p, c) => (p += traverse(c)), 0);

    if (v <= 100000) {
      tot += v;
    }

    return v;
  };

  traverse(n);
  return tot;
};

const findSmallestDeletable = (n: Node, thres: number) => {
  let smallest = 70000000;

  const traverse = (n: Node): number => {
    const v = n.size + n.children.reduce((p, c) => (p += traverse(c)), 0);

    if (v >= thres && v <= smallest) {
      smallest = v;
    }

    return v;
  };

  traverse(n);
  return smallest;
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
const one = (data: string) => getSizeBelow(goToTop(parse(data)));
readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const tree = parse(data);
  const total = 70000000;
  const needed = 30000000;
  const free = total - size(goToTop(tree));

  const thres = needed - free;

  return findSmallestDeletable(goToTop(tree), thres);
};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
