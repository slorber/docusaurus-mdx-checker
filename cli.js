#!/usr/bin/env node

import process from "node:process";
import main from "./main.js";

// TODO

const verbose = false;

const excludeVersionedDocs = true;

const cwd = "/Users/sebastienlorber/Desktop/projects/jest";

const include = ["**/*.{md,mdx}", "../docs/**/*.{md,mdx}"];

const exclude = [
  "packages",
  "examples",
  "node_modules",
  //
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "README.md",
  "website/README.md",
  "benchmarks/test-file-overhead/README.md",
  //
  excludeVersionedDocs ? "**/versioned_docs" : null,
].filter(Boolean);

const format = "mdx";

try {
  const result = await main({
    verbose,
    cwd,
    format,
    include,
    exclude,
  });
  console.log(result);
  process.exit(1);
} catch (error) {
  console.error(error);
  process.exit(1);
}
