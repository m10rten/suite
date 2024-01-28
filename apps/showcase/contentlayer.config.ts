/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "**/*.{mdx,md}",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
      description: "The category of the Doc post",
    },
    package: {
      type: "string",
      required: true,
      description: "The package the Doc post belongs to",
    },
    published: {
      type: "boolean",
      required: true,
      default: true,
      description: "Whether the Doc post is public or private",
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: false,
    },
    description: {
      type: "string",
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ""),
      description: "The slug for the Doc post",
    },
  },
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Doc],

  mdx: {
    // remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error - types are wrong
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
