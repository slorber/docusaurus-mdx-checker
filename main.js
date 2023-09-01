#!/usr/bin/env node

import fs from "node:fs/promises";
import process from "node:process";
import path from "node:path";
import { globby } from "globby";
import { compile } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkDirectives from "remark-directive";
import remarkGFM from "remark-gfm";
import remarkComment from "@slorber/remark-comment";

const remarkPlugins = [
  remarkFrontmatter,
  remarkDirectives,
  remarkGFM,
  remarkComment,
];

////////////////////////////////////////
// Script

export default async function main({ verbose, cwd, format, include, exclude }) {
  const allRelativeFilePaths = await globby(include, {
    cwd,
    ignore: exclude,
    // gitignore: true, // Does not work well with relative paths like ../docs
  });

  if (allRelativeFilePaths.length === 0) {
    console.error("Couldn't find any file to compile!");
    process.exit(1);
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

  if (allErrors.length === 0) {
    console.log("All MDX files compile successfully!");
    process.exit(0);
  }

  const outputSeparator = "\n---\n";
  const outputs = allErrors.map((error) => {
    return error.errorMessage;
  });

  console.log("Some MDX files couldn't compile successfully!");
  console.log(
    outputSeparator + outputs.join(outputSeparator) + outputSeparator
  );

  process.exit(1);

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
