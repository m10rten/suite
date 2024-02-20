import { NextRequest } from "next/server";
import { Quick } from "@mvdlei/edge";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/log";
import { create } from "@/lib/redis";

export const GET = async (_req: NextRequest, ctx: { params: { key: string } }) => {
  try {
    const { key } = ctx.params;
    const redis = await create();
    const cached = await redis.client.get(`link:${key}`);
    logger.log("Cache", cached);
    if (cached) {
      const json = JSON.parse(cached);
      return Quick.status(Quick.STATUS_CODES.OK).json(json);
    }

    const link = await prisma.link.findUnique({
      where: {
        key,
      },
      select: {
        url: true,
        key: true,
        domain: true,
      },
    });
    if (!link) {
      const previousKey = await prisma.link.findFirst({
        where: {
          previous_key: key,
        },
        select: {
          key: true,
        },
      });
      if (previousKey) {
        return Response.redirect(`/${previousKey.key}`);
      }
      return Quick.status(Quick.STATUS_CODES.BAD_REQUEST).json({
        error: "A bad request",
      });
    }

    await redis.client.set(`link:${key}`, JSON.stringify(link));

    return Quick.status(Quick.STATUS_CODES.OK).json(link);
  } catch (e) {
    return Quick.status(Quick.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: e instanceof Error ? e.message : "An error occurred",
    });
  }
};
