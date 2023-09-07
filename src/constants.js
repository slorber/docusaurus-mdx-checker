import remarkFrontmatter from "remark-frontmatter";
import remarkDirectives from "remark-directive";
import remarkGFM from "remark-gfm";
import remarkComment from "@slorber/remark-comment";

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
