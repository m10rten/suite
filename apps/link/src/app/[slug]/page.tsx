// This page will handle all the dynamic routes and update the analytics for the link, then redirect to the original link (with utm parameters if needed)

import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/log";

export default async function LinkPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await prisma.link.findUnique({
    where: {
      key: slug,
    },
  });
  if (!data) {
    return notFound();
  }

  // Update the analytics for the link
  await prisma.link.update({
    where: {
      key: slug,
    },
    data: {
      visits: {
        increment: 1,
      },
      lastVisited: new Date(),
    },
  });

  // Redirect to the original link
  const url = new URL(data.url);
  if (data?.utm_source) url.searchParams.set("utm_source", data.utm_source);
  if (data?.utm_medium) url.searchParams.set("utm_medium", data.utm_medium);
  if (data?.utm_campaign) url.searchParams.set("utm_campaign", data.utm_campaign);
  if (data?.utm_term) url.searchParams.set("utm_term", data.utm_term);
  if (data?.utm_content) url.searchParams.set("utm_content", data.utm_content);
  const str = url.toString();
  logger.log("Redirecting to", str);
  return redirect(str);
}
