import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

/* PART 1 */
const one = (data: string) => {};
readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
