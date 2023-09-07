// Direct copy of Docusaurus preprocessor code
// We need to support mdx1compat options to reduce the amount of reported errors
export function preprocess(content) {
  let fileContent = content;
  fileContent = unwrapMdxCodeBlocks(fileContent);
  fileContent = escapeMarkdownHeadingIds(fileContent);
  return fileContent;
}

function unwrapMdxCodeBlocks(content) {
  // We only support 3/4 backticks on purpose, should be good enough
  const regexp3 =
    /(?<begin>^|\n)```mdx-code-block\n(?<children>.*?)\n```(?<end>\n|$)/gs;
  const regexp4 =
    /(?<begin>^|\n)````mdx-code-block\n(?<children>.*?)\n````(?<end>\n|$)/gs;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const replacer = (substring, ...args) => {
    const groups = args.at(-1);
    return `${groups.begin}${groups.children}${groups.end}`;
  };

  return content.replaceAll(regexp3, replacer).replaceAll(regexp4, replacer);
}

function escapeMarkdownHeadingIds(content) {
  const markdownHeadingRegexp = /(?:^|\n)#{1,6}(?!#).*/g;
  return content.replaceAll(markdownHeadingRegexp, (substring) =>
    // TODO probably not the most efficient impl...
    substring
      .replace("{#", "\\{#")
      // prevent duplicate escaping
      .replace("\\\\{#", "\\{#")
  );
}
