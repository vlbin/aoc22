import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

interface Monkey {
  idx: number;
  items: number[];
  operation: (old: number) => number;
  test: (item: number) => number;
  inspected: number;
  mod: number;
}

const turn = (
  monkey: Monkey,
  monkeys: Monkey[],
  sanityOp: (a: number) => number
) => {
  let item = monkey.items.shift();
  while (item !== undefined) {
    const wl = sanityOp(
      monkey.operation(item % monkeys.reduce((p, c) => p * c.mod, 1))
    );

    const nextMonkey = monkey.test(wl);

    monkey.inspected += 1;
    monkeys[nextMonkey].items.push(wl);
    item = monkey.items.shift();
  }
};

const round = (
  monkeys: Monkey[],
  sanityOp: (a: number) => number,
  max: number
) => {
  Array(max)
    .fill(0)
    .forEach((_, i) => {
      monkeys.forEach((monkey) => {
        turn(monkey, monkeys, sanityOp);
      });
    });
  return monkeys;
};

const parseItem = (start: string): Monkey["items"] =>
  start.split(":")[1].trim().split(", ").map(Number);

const parseOp = (op: string): Monkey["operation"] => {
  const [_, o, fact] = op.split(" = ")[1].split(" ");

  return (a) => {
    const _fact = fact === "old" ? a : Number(fact);
    return o === "+" ? a + _fact : a * _fact;
  };
};

const parseTest = (
  test: string,
  testT: string,
  testF: string
): Monkey["test"] => {
  const fact = Number(test.split(" ").slice(-1));
  const m1 = Number(testT.split(" ").slice(-1));
  const m2 = Number(testF.split(" ").slice(-1));
  return (item) => (item % fact === 0 ? m1 : m2);
};

const parse = (input: string): Monkey[] => {
  return input.split("\n\n").map((monk, i) => {
    const [_, start, op, test, testT, testF] = monk.split("\n");
    return {
      idx: i,
      items: parseItem(start),
      operation: parseOp(op),
      test: parseTest(test, testT, testF),
      inspected: 0,
      mod: Number(test.split(" ").slice(-1)),
    };
  });
};

/* PART 1 */
const one = (data: string) => {
  const monkeys = parse(data);

  round(monkeys, (a) => Math.floor(a / 3), 20);
  return monkeys
    .map((x) => x.inspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((p, c) => p * c, 1);
};
//readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  return [
    99 * 103,
    round(parse(data), (a) => a, 10000)
      .map((x) => x.inspected)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((p, c) => p * c, 1),
  ];
};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
