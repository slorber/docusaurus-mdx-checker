import { describe, expect, test } from "vitest";
import main from "../src/main";
import {
  DefaultRemarkPlugins,
  VersionedDocsExclusion,
} from "../src/constants.js";
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

const OnlyDocsInclude = "docs/**/*.{md,mdx}";

describe("Docusaurus", () => {
  async function testDocusaurusSite(options) {
    return main({
      format: "detect",
      remarkPlugins: [...DefaultRemarkPlugins, remarkMath],
      ...options,
    });
  }

  test("v2 website does not compile", async () => {
    await expect(
      testDocusaurusSite({
        cwd: SiteFixtures.v2.docusaurus,
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("v2 website does not compile - only docs", async () => {
    await expect(
      testDocusaurusSite({
        cwd: SiteFixtures.v2.docusaurus,
        include: [OnlyDocsInclude],
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("v2 website does not compile - exclude versioned docs", async () => {
    await expect(
      testDocusaurusSite({
        cwd: SiteFixtures.v2.docusaurus,
        exclude: [VersionedDocsExclusion],
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("v3 website compiles", async () => {
    const result = await testDocusaurusSite({
      cwd: SiteFixtures.v3.docusaurus,
    });

    expect(result).toMatchInlineSnapshot(
      '"[32m[SUCCESS][39m All 694 MDX files compiled successfully!"'
    );
  });

  test("v3 website compiles - only docs", async () => {
    const result = await testDocusaurusSite({
      cwd: SiteFixtures.v3.docusaurus,
      include: [OnlyDocsInclude],
    });

    expect(result).toMatchInlineSnapshot(
      '"[32m[SUCCESS][39m All 85 MDX files compiled successfully!"'
    );
  });

  test("v3 website compiles - exclude versioned docs", async () => {
    const result = await testDocusaurusSite({
      cwd: SiteFixtures.v3.docusaurus,
      exclude: [VersionedDocsExclusion],
    });

    expect(result).toMatchInlineSnapshot(
      '"[32m[SUCCESS][39m All 204 MDX files compiled successfully!"'
    );
  });
});
