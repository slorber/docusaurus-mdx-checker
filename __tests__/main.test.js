import { expect, test } from "vitest";
import main from "../main.js";

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

test("adds 1 + 2 to equal 3", async () => {
  const result = await main({
    verbose,
    cwd,
    format,
    include,
    exclude,
  });

  expect(result).toMatchInlineSnapshot(
    '"[32m[SUCCESS][39m All MDX files compiled successfully!"'
  );
});
