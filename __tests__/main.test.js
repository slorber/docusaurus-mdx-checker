import { describe, expect, test } from "vitest";
import main, { DefaultRemarkPlugins } from "../main.js";
import remarkMath from "remark-math";

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
  // excludeVersionedDocs ? "**/versioned_docs" : null,
].filter(Boolean);

describe("Docusaurus", () => {
  async function testDocusaurusSite(options) {
    return main({
      format: "detect",
      remarkPlugins: [...DefaultRemarkPlugins, remarkMath],
      ...options,
    });
  }

  test("v3 website compiles", async () => {
    const result = await testDocusaurusSite({
      cwd: SiteFixtures.v3.docusaurus,
    });

    expect(result).toMatchInlineSnapshot(
      '"[32m[SUCCESS][39m All 694 MDX files compiled successfully!"'
    );
  });

  test("v3 website compiles without versioned docs", async () => {
    const result = await testDocusaurusSite({
      cwd: SiteFixtures.v3.docusaurus,
      exclude: "**/versioned_docs",
    });

    expect(result).toMatchInlineSnapshot(
      '"[32m[SUCCESS][39m All 204 MDX files compiled successfully!"'
    );
  });
});
