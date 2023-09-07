#!/usr/bin/env node

import process from "node:process";
import main from "src/main.js";

const cwd = "/Users/sebastienlorber/Desktop/projects/jest";
const verbose = true;

try {
  const result = await main({
    cwd,
    verbose,
  });
  console.log(result);
  process.exit(1);
} catch (error) {
  console.error(error);
  process.exit(1);
}
