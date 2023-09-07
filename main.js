#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { globby } from "globby";
import { compile } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkDirectives from "remark-directive";
import remarkGFM from "remark-gfm";
import remarkComment from "@slorber/remark-comment";
import chalk from "chalk";

const remarkPlugins = [
  remarkFrontmatter,
  remarkDirectives,
  remarkGFM,
  remarkComment,
];

const SuccessPrefix = chalk.green("[SUCCESS]");
const ErrorPrefix = chalk.red("[ERROR]");

export const DefaultInclude = Object.freeze([
  "**/*.{md,mdx}",
  "../docs/**/*.{md,mdx}",
]);

export const DefaultExclude = Object.freeze([
  "packages",
  "examples",
  "node_modules",
  //
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "README.md",
  "website/README.md",
]);

////////////////////////////////////////
// Script

export default async function main({
  cwd = undefined,
  include = DefaultInclude,
  exclude = DefaultExclude,
  format = "mdx",
  verbose = false,
}) {
  const allRelativeFilePaths = await globby(include, {
    cwd,
    ignore: exclude,
    // gitignore: true, // Does not work well with relative paths like ../docs
  });

  if (allRelativeFilePaths.length === 0) {
    throw new Error(`${ErrorPrefix} Couldn't find any file to compile!`);
  }

  console.log(
    "Found " + allRelativeFilePaths.length + " files to compile with MDX"
  );

  if (verbose) {
    console.log(
      "List of files:\n",
      JSON.stringify(allRelativeFilePaths, null, 2)
    );
  }

  const allResults = await Promise.all(
    allRelativeFilePaths.map(processFilePath)
  );

  const allErrors = allResults.filter((r) => r.status === "error");
  const allSuccess = allResults.filter((r) => r.status === "success");

  console.log(`Errors: ${allErrors.length}`);
  console.log(`Success: ${allSuccess.length}`);

  if (allErrors.length > 0) {
    const outputSeparator = `\n${chalk.yellow("---")}\n`;
    throw new Error(
      `${ErrorPrefix} Some MDX files couldn't compile successfully!
${outputSeparator}${allErrors
        .map((error) => error.errorMessage)
        .join(outputSeparator)}${outputSeparator}`
    );
  } else {
    return `${SuccessPrefix} All ${allRelativeFilePaths.length} MDX files compiled successfully!`;
  }

  ////////////////////////////////////////
  // Functions

  async function processFilePath(relativeFilePath) {
    const filePath = path.resolve(cwd, relativeFilePath);
    try {
      // console.log("filePath", filePath);
      const fileContent = await fs.readFile(filePath);
      // console.log("fileContent", fileContent);
      const result = await compile(fileContent, { format, remarkPlugins });
      // TODO generate warnings for compat options here?
      return { relativeFilePath, status: "success", result };
    } catch (error) {
      const errorMessage = `Error while compiling file ${relativeFilePath}:\n${formatMDXErrorMessage(
        error
      )}`;
      return { relativeFilePath, status: "error", error, errorMessage };
    }
  }

  function formatMDXErrorMessage(error) {
    let message = `Details: ${error.message}`;

    if (error.line || error.column) {
      let lineColumn = "";
      if (error.line) {
        lineColumn = lineColumn + "Line=" + error.line + " ";
      }
      if (error.column) {
        lineColumn = lineColumn + "Column=" + error.column;
      }
      message = message + "\n" + lineColumn;
    }

    return message;
  }
}
