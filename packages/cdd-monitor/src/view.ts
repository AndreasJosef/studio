import { stdout } from "node:process";
import { type CompilerError } from "./types";

// ANSI Codes (Level 2 Logic buried here)
const C = {
  CYAN: "\x1b[36m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  RESET: "\x1b[0m",
  BOLD: "\x1b[1m",
  CLEAR: "\x1b[2J\x1b[3J\x1b[H",
};

export function clearScreen() {
  stdout.write(C.CLEAR);
  console.log(`${C.BOLD}TSCDD Error Tasklist${C.RESET}`);
  console.log(`${C.CYAN}Watching...${C.RESET}\n`);
}

export function printSuccess() {
  stdout.write(C.CLEAR);
  console.log(`${C.GREEN}${C.BOLD}✔ TSC is Happy!${C.RESET}`);
}

export function printError(err: CompilerError) {
  const loc = `${err.file}:${err.line}:${err.col}`;
  console.log(`${C.BOLD}${C.CYAN}${loc}${C.RESET}`);
  console.log(`${C.RED}→ ${err.message}${C.RESET}\n`);
}
