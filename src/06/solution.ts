import { readFile } from "fs/promises";
import { timed } from "../utils/timed";

/* PART 1 */
const one = (data: string) => {
  return (
    data.split("").findIndex((c, i, arr) => {
      return new Set([arr[i], arr[i + 1], arr[i + 2], arr[i + 3]]).size === 4;
    }) + 4
  );
};
readFile("input.txt", "utf-8").then((data) => console.log(one(data)));
//readFile("input.txt", "utf-8").then((data) => timed(1, () => one(data)));

/* PART 2 */
const two = (data: string) => {
  return (
    data.split("").findIndex((c, i, arr) => {
      return new Set(arr.slice(i, i + 14)).size === 14;
    }) + 14
  );
};
readFile("input.txt", "utf-8").then((data) => console.log(two(data)));
//readFile("input.txt", "utf-8").then((data) => timed(2, () => two(data)));
