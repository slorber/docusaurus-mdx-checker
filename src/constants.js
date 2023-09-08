import remarkFrontmatter from "remark-frontmatter";
import remarkDirectives from "remark-directive";
import remarkGFM from "remark-gfm";
import remarkComment from "@slorber/remark-comment";

// This is an approximation bug good enough?
// Node/browser share a lot of globals so it's almost correct?
// See https://github.com/pierrec/node-eval/pull/27
export const DefaultGlobals = Object.getOwnPropertyNames(globalThis);

export const VersionedDocsExclusion = "**/versioned_docs";

export const DefaultRemarkPlugins = Object.freeze([
  remarkFrontmatter,
  remarkDirectives,
  remarkGFM,
  remarkComment,
]);

export const DefaultRehypePlugins = Object.freeze([]);

export const DefaultInclude = Object.freeze([
  "**/*.{md,mdx}",
  "../docs/**/*.{md,mdx}",
]);

export const DefaultExclude = Object.freeze([
  "packages",
  "examples",
  "node_modules",
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "README.md",
  //
  "website/packages",
  "website/examples",
  "website/node_modules",
  "website/CHANGELOG.md",
  "website/CODE_OF_CONDUCT.md",
  "website/CONTRIBUTING.md",
  "website/README.md",
]);
