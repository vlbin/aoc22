import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

interface PriorityQueue<T> {
  insert(item: T, priority: number): void;
  peek(): T | undefined;
  pop(): T | undefined;
  size(): number;
  has(e: T): boolean;
  isEmpty(): boolean;
}

class Item<T> {
  elem: T;
  prio: number;
  constructor(e: T, p: number) {
    this.elem = e;
    this.prio = p;
  }
  item() {
    return this.elem;
  }
}

class SortedSet<T> {
  private list: Item<T>[] = [];

  add(e: T, p: number) {
    const item = new Item(e, p);

    if (this.list.length === 0) {
      this.list.push(item);
      return;
    }

    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].elem === item.elem) {
        return;
      }

      if (i === this.list.length - 1) {
        this.list.push(item);
        return;
      }

      if (this.list[i].prio > item.prio) {
        this.list.splice(i, 0, item);
        return;
      }
    }
  }

  has(e: T) {
    return this.list.findIndex((x) => x.elem === e) > -1;
  }

  pop(): [T, number] {
    const v = this.list.splice(0, 1);
    return [v[0].elem, v[0].prio];
  }

  size() {
    return this.list.length;
  }
}

const prio = (x: string) => {
  if (x === "S") {
    x = "a";
  } else if (x === "E") {
    x = "z";
  }
  return x.charCodeAt(0) - 96;
};

const isValid = (current: number[], desired: number[], grid: number[][]) => {
  return (
    desired[0] >= 0 &&
    desired[1] >= 0 &&
    desired[0] < grid.length &&
    desired[1] < grid[0].length &&
    grid[desired[0]][desired[1]] - grid[current[0]][current[1]] <= 1
  );
};

const _start = (grid: string[][]) => {
  const startRow = grid.findIndex((x) => x.includes("S"))!;
  const startCol = grid[startRow].findIndex((x) => x === "S");
  return [startRow, startCol];
};

const _end = (grid: string[][]) => {
  const endRow = grid.findIndex((x) => x.includes("E"))!;
  const endCol = grid[endRow].findIndex((x) => x === "E");
  return [endRow, endCol];
};

const neighbors = (
  current: string,
  grid: number[][],
  translateMap: Map<string, number[]>
) => {
  const _current = translateMap.get(current)!;

  return [up(_current), down(_current), left(_current), right(_current)]
    .filter((x) => isValid(_current, x, grid))
    .map((x) => JSON.stringify(x));
};

const h = (node: string, goal: string, translateMap: Map<string, number[]>) => {
  const _n = translateMap.get(node)!;
  const _g = translateMap.get(goal)!;

  return Math.abs(_g[0] - _n[0]) + Math.abs(_g[1] - _n[1]);
};

const a_star = (
  start: string,
  goal: string,
  priodGrid: number[][],
  translateMap: Map<string, number[]>
) => {
  const openSet = new SortedSet<string>();

  openSet.add(start, 0);

  const costSoFar = new Map<string, number>();
  costSoFar.set(start, 0);

  const cameFrom = new Map<string, string>();

  while (openSet.size()) {
    const [ck, cp] = openSet.pop();

    if (ck === goal) {
      return costSoFar.get(goal)!;
    }

    const children = neighbors(ck, priodGrid, translateMap);
    for (let child of children) {
      let cost = costSoFar.get(ck)! + 1;

      if (!costSoFar.has(child) || cost < costSoFar.get(child)!) {
        costSoFar.set(child, cost);
        let prior = cost + h(child, goal, translateMap);

        openSet.add(child, prior);
        cameFrom.set(child, ck);
      }
    }
  }
  return 10000000;
};

const up = (cur: number[]) => [cur[0] - 1, cur[1]];
const down = (cur: number[]) => [cur[0] + 1, cur[1]];
const left = (cur: number[]) => [cur[0], cur[1] - 1];
const right = (cur: number[]) => [cur[0], cur[1] + 1];

/* PART 1 */
const one = (data: string) => {
  const grid = data.split("\n").map((x) => x.split(""));
  const priodGrid = grid.map((row) => row.map((c) => prio(c)));

  const start = _start(grid);
  const end = _end(grid);

  const translateMap = new Map<string, number[]>();
  for (let [i, r] of grid.entries()) {
    for (let [j] of r.entries()) {
      translateMap.set(JSON.stringify([i, j]), [i, j]);
    }
  }

  try {
    const t1 = performance.now();

    const x = a_star(
      JSON.stringify(start),
      JSON.stringify(end),
      priodGrid,
      translateMap
    );

    const t2 = performance.now();
    console.log(t2 - t1);
    return x;
  } catch (e) {
    console.log(e);
  }
};
readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  const grid = data
    .split("\n")
    .map((x) => x.split("").map((x) => (x === "S" ? "a" : x)));
  const priodGrid = grid.map((l) => l.map((c) => prio(c)));

  const end = _end(grid);
  const es = JSON.stringify(end);

  const translateMap = new Map<string, number[]>();
  for (let [i, r] of grid.entries()) {
    for (let [j, c] of r.entries()) {
      translateMap.set(JSON.stringify([i, j]), [i, j]);
    }
  }

  try {
    const t1 = performance.now();

    let lowest = 100000;
    let starts: string[] = [];

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === "a") {
          const start = [i, j];

          const x = a_star(JSON.stringify(start), es, priodGrid, translateMap);
          if (x) {
            if (x < lowest) {
              lowest = x;
            }
          }
        }
      });
    });

    const t2 = performance.now();
    console.log(t2 - t1);
    return [lowest, starts];
  } catch (e) {
    console.log(e);
  }
};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
