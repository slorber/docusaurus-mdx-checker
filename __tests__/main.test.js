import { describe, expect, test } from "vitest";
import { resolve, dirname, relative } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import main from "../main.js";

const FixtureSitesPath = "./__tests__/__fixtures__/sites";

const SiteFixtures = {
  v2: {
    docusaurus: `${FixtureSitesPath}/docusaurus-v2`,
    jest: `${FixtureSitesPath}/jest-v2`,
    reactnative: `${FixtureSitesPath}/react-native-v2`,
  },
  v3: {
    docusaurus: `${FixtureSitesPath}/docusaurus-v3`,
    jest: `${FixtureSitesPath}/jest-v3`,
    reactnative: `${FixtureSitesPath}/react-native-v3`,
  },
};

console.log(SiteFixtures);

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

describe("v3 sites", () => {
  test("Docusaurus site compiles", async () => {
    const result = await main({
      cwd: SiteFixtures.v3.docusaurus,
    });

    expect(result).toMatchInlineSnapshot(
      '"[32m[SUCCESS][39m All 58 MDX files compiled successfully!"'
    );
  });
});

test("adds 1 + 2 to equal 3", async () => {
  const result = await main({
    verbose,
    cwd,
    format,
    include,
    exclude,
  });

  expect(result).toMatchInlineSnapshot(
    '"[32m[SUCCESS][39m All 58 MDX files compiled successfully!"'
  );
});
