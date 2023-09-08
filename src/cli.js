#!/usr/bin/env node

import { program } from "commander";
import process from "node:process";
import main from "./main.js";

program
  .option("-c --cwd <cwd>", "the CWD dir containing your MDX files")
  .option("-v --verbose", "enables more verbose logging")
  .option(
    "-g --globals",
    "Attempt to report usage of unknown global variables in MDX"
  );

program.parse();

const options = program.opts();
if (options.verbose) {
  console.log("Options: ", options);
}

const {
  cwd = process.cwd(),
  verbose = false,
  checkUnknownGlobals: globals = undefined,
} = options;

try {
  const result = await main({
    cwd,
    verbose,
    globals,
  });
  console.log(result);
  process.exit(0);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
