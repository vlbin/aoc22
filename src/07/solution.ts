import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

interface Node {
  name: string;
  size: number;
  children: Node[];
  parent?: Node;
}

const root = (n: Node): Node => {
  if (n.parent) return root(n.parent);
  return n;
};

const getSizeBelow = (n: Node) => {
  let tot = 0;

  const traverse = (n: Node) => {
    if (n.size <= 100000) {
      tot += n.size;
    }

    n.children.forEach(traverse);
  };
  traverse(n);
  return tot;
};

const findSmallestDeletable = (n: Node, thres: number) => {
  let smallest = 70000000;

  const traverse = (n: Node) => {
    if (n.size >= thres && n.size <= smallest) {
      smallest = n.size;
    }

    n.children.forEach(traverse);
  };

  traverse(n);
  return smallest;
};

const updateSizes = (diff: number, n?: Node) => {
  if (n) {
    n.size += diff;
    updateSizes(diff, n.parent);
  }
};

const parse = (data: string) => {
  const lines = data.split("\n");

  const tree = lines
    .filter((x) => x != "$ ls")
    .map((l) => (l.startsWith("$ cd") ? l.replace("$ cd ", "") : l))
    .slice(1)
    .reduce(
      (p, c) => {
        if (c.startsWith("dir")) {
          p.children.push({
            name: c.substring(4),
            size: 0,
            children: [],
            parent: p,
          });
        } else if (c.startsWith("..")) {
          return p.parent!;
        } else if (c.match(/^\d/)) {
          const size = parseInt(c, 10);
          p.size += size;
          updateSizes(size, p.parent);
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
const one = (data: string) => getSizeBelow(root(parse(data)));
//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const tree = parse(data);
  const total = 70000000;
  const needed = 30000000;
  const _root = root(tree);
  const free = total - _root.size;

  const thres = needed - free;

  return findSmallestDeletable(_root, thres);
};
//readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
