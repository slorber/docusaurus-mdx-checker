import { describe, expect, test } from "vitest";
import main from "../src/main";
import {
  DefaultGlobals,
  DefaultRemarkPlugins,
  VersionedDocsExclusion,
} from "../src/constants.js";

const FixturePath = "./__tests__/__fixtures__";
const FixtureSitesPath = `${FixturePath}/sites`;
const FixtureCustomPath = `${FixturePath}/custom`;

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

describe("Custom fixture", () => {
  async function testCustom(name, options) {
    return main({
      cwd: `${FixtureCustomPath}/${name}`,
      // verbose: true,
      ...options,
    });
  }

  describe("globals", () => {
    test("does not compile", async () => {
      await expect(
        testCustom("globals", {})
      ).rejects.toThrowErrorMatchingSnapshot();
    });
    test("compiles with globals=null", async () => {
      const result = await testCustom("globals", { globals: null });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 1 MDX files compiled successfully!"'
      );
    });
  });
});

describe("Docusaurus", () => {
  async function testDocusaurus(options) {
    return main({
      format: "mdx",
      globals: null,
      // verbose: true,
      ...options,
    });
  }

  const OnlyDocsInclude = "docs/**/*.{md,mdx}";

  describe("v2", () => {
    async function testSite(options) {
      return testDocusaurus({
        cwd: SiteFixtures.v2.docusaurus,
        // verbose: true,
        ...options,
      });
    }

    test("does not compile", async () => {
      await expect(testSite({})).rejects.toThrowErrorMatchingSnapshot();
    });

    test("does not compile - only docs", async () => {
      await expect(
        testSite({
          include: [OnlyDocsInclude],
        })
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    test("does not compile - exclude versioned docs", async () => {
      await expect(
        testSite({
          exclude: [VersionedDocsExclusion],
        })
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe("v3", () => {
    async function testSite(options) {
      return testDocusaurus({
        cwd: SiteFixtures.v3.docusaurus,
        format: "detect",
        // verbose: true,
        ...options,
      });
    }

    test("compiles", async () => {
      const result = await testSite({});
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 289 MDX files compiled successfully!"'
      );
    });

    test("compiles - only docs", async () => {
      const result = await testSite({
        include: [OnlyDocsInclude],
      });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 85 MDX files compiled successfully!"'
      );
    });

    test("compiles - exclude versioned docs", async () => {
      const result = await testSite({
        exclude: [VersionedDocsExclusion],
      });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 204 MDX files compiled successfully!"'
      );
    });
  });
});

describe("Jest", () => {
  async function testJest(options) {
    return main({
      globals: null,
      // verbose: true,
      ...options,
    });
  }

  const OnlyDocsInclude = "docs/**/*.{md,mdx}";

  describe("v2", () => {
    async function testSite(options) {
      return testJest({
        cwd: SiteFixtures.v2.jest,
        // verbose: true,
        ...options,
      });
    }

    test("does not compile", async () => {
      await expect(testSite({})).rejects.toThrowErrorMatchingSnapshot();
    });

    test("does not compile - only docs", async () => {
      await expect(
        testSite({
          include: [OnlyDocsInclude],
        })
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    test("does not compile - exclude versioned docs", async () => {
      await expect(
        testSite({
          exclude: [VersionedDocsExclusion],
        })
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe("v3", () => {
    async function testSite(options) {
      return testJest({
        cwd: SiteFixtures.v3.jest,
        format: "detect",
        // verbose: true,
        ...options,
      });
    }

    test("compiles", async () => {
      const result = await testSite({});
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 95 MDX files compiled successfully!"'
      );
    });

    test("compiles - website cwd", async () => {
      const result = await testSite({ cwd: `${SiteFixtures.v3.jest}/website` });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 95 MDX files compiled successfully!"'
      );
    });

    test("compiles - only docs", async () => {
      const result = await testSite({
        include: [OnlyDocsInclude],
      });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 37 MDX files compiled successfully!"'
      );
    });

    test("compiles - exclude versioned docs", async () => {
      const result = await testSite({
        exclude: [VersionedDocsExclusion],
      });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 59 MDX files compiled successfully!"'
      );
    });
  });
});

describe("React-Native", () => {
  async function testReactNative(options) {
    return main({
      globals: null,
      // verbose: true,
      ...options,
    });
  }

  const OnlyDocsInclude = "docs/**/*.{md,mdx}";

  describe("v2", () => {
    async function testSite(options) {
      return testReactNative({
        cwd: SiteFixtures.v2.reactnative,
        // verbose: true,
        ...options,
      });
    }

    test("does not compile", async () => {
      await expect(testSite({})).rejects.toThrowErrorMatchingSnapshot();
    });

    test("does not compile - with globals", async () => {
      await expect(
        testSite({ globals: DefaultGlobals })
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    test("does not compile - only docs", async () => {
      await expect(
        testSite({
          include: [OnlyDocsInclude],
        })
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    test("does not compile - exclude versioned docs", async () => {
      await expect(
        testSite({
          exclude: [VersionedDocsExclusion],
        })
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe("v3", () => {
    async function testSite(options) {
      return testReactNative({
        cwd: SiteFixtures.v3.reactnative,
        format: "detect",
        // verbose: true,
        ...options,
      });
    }

    test("compiles", async () => {
      const result = await testSite({});
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 483 MDX files compiled successfully!"'
      );
    });

    test("compiles - with globals", async () => {
      const result = await testSite({ globals: DefaultGlobals });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 483 MDX files compiled successfully!"'
      );
    });

    test("compiles - website cwd", async () => {
      const result = await testSite({
        cwd: `${SiteFixtures.v3.reactnative}/website`,
      });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 483 MDX files compiled successfully!"'
      );
    });

    test("compiles - only docs", async () => {
      const result = await testSite({
        include: [OnlyDocsInclude],
      });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 184 MDX files compiled successfully!"'
      );
    });

    test("compiles - exclude versioned docs", async () => {
      const result = await testSite({
        exclude: [VersionedDocsExclusion],
      });
      expect(result).toMatchInlineSnapshot(
        '"[32m[SUCCESS][39m All 299 MDX files compiled successfully!"'
      );
    });
  });
});
