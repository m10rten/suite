import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { Mdx } from "@/components/mdx";

export const generateStaticParams = async () =>
  allDocs.map((doc) => ({ package: doc._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string[] } }) => {
  const path = `${makePath(params.slug)}`;
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === path);
  if (!doc || (doc?.published !== null && doc?.published === false)) return notFound();
  return { title: doc.title };
};

const makePath = (strs: string[]) =>
  strs
    .map((s) => `/${s}`)
    .join("")
    .toLowerCase()
    .replace("/", "");

export default function DocsPage({ params }: { params: { slug: string[] } }) {
  const path = `${makePath(params.slug)}`;
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === path);

  if (!doc || (doc?.published !== null && doc?.published === false)) return notFound();

  return (
    <section className="mx-auto w-full px-1 sm:px-2 pb-4">
      {/* <DocsPageHeader heading={doc.title} text={doc.description} /> */}
      <Mdx code={doc.body.code} />
    </section>
  );
}
