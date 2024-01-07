import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { Mdx } from "@/components/mdx";

export const generateStaticParams = async () =>
  allDocs.map((doc) => ({ package: doc._raw.flattenedPath }));

export const generateMetadata = ({
  params,
}: {
  params: { package: string; category: string; slug: string };
}) => {
  const path = `${params.category}/${params.package}/${params.slug}`;
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === path);
  if (!doc) return notFound();
  return { title: doc.title };
};

export default function SlugPage({
  params,
}: {
  params: { package: string; category: string; slug: string };
}) {
  const path = `${params.category}/${params.package}/${params.slug}`;
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === path);
  if (!doc) return notFound();

  return (
    <div className="min-w-0 mx-auto w-full px-1 sm:px-2">
      {/* <DocsPageHeader heading={doc.title} text={doc.description} /> */}
      <Mdx code={doc.body.code} />
    </div>
  );
}
