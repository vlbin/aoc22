import { readFile as _readFile } from "fs/promises";

type ReadFile = {
  <T>(separator?: string, parsingFn?: (token: string) => T): Promise<T[]>;
};

export const readFile: ReadFile = async <T>(
  separator = "\n",
  parsingFn = (token) => token
): Promise<T[]> => {
  const file = await _readFile("input.txt", "utf-8");
  return file.split(separator).map(parsingFn);
};
