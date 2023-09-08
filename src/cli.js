#!/usr/bin/env node

import { program } from "commander";
import process from "node:process";
import main from "./main.js";

program
  .option("-c --cwd <cwd>", "the CWD dir containing your MDX files")
  .option("-v --verbose", "enables more verbose logging")
  .option(
    "-g --check-unknown-globals",
    "attempt to report usage of unknown global variables in MDX"
  );

program.parse();

const options = program.opts();
console.log("Options: ", options);

const { cwd, verbose, checkUnknownGlobals } = options;

const globals = checkUnknownGlobals
  ? // Default globals
    undefined
  : // Check disabled
    null;

try {
  const result = await main({
    cwd,
    verbose,
    globals,
  });
  console.log(result);
  process.exit(1);
} catch (error) {
  console.error(error);
  process.exit(1);
}
