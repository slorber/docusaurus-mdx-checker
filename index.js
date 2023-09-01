#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { globby, isGitIgnored } from "globby";
import { compile } from "@mdx-js/mdx";

////////////////////////////////////////
// Params

const versioned = false;

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
  versioned ? null : "**/versioned_docs",
].filter(Boolean);

const format = "mdx";

////////////////////////////////////////
// Script

const allRelativeFilePaths = await globby(include, {
  cwd,
  ignore: exclude,
  // gitignore: true, // Does not work well with relative paths like ../docs
});

console.log(
  "All file paths being checked: " + allRelativeFilePaths.length,
  JSON.stringify(allRelativeFilePaths, null, 2)
);

const allResults = await Promise.all(allRelativeFilePaths.map(processFilePath));

const allErrors = allResults.filter((r) => r.status === "error");
const allSuccess = allResults.filter((r) => r.status === "success");

console.log("Errors: ", allErrors.length);
console.log("Success: ", allSuccess.length);

const firstError = allErrors?.[0]?.error;
console.error("firstError", firstError);

////////////////////////////////////////
// Functions

async function processFilePath(relativeFilePath) {
  const filePath = path.resolve(cwd, relativeFilePath);
  try {
    // console.log("filePath", filePath);
    const fileContent = await fs.readFile(filePath);
    // console.log("fileContent", fileContent);
    const result = await compile(fileContent, { format });
    // TODO handle warnings
    return { relativeFilePath, status: "success", result };
  } catch (error) {
    const wrappedError = new Error(
      "Error while processing file " + relativeFilePath,
      { cause: error }
    );
    return { relativeFilePath, status: "error", error: wrappedError };
  }
}
