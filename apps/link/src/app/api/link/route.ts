import { NextRequest } from "next/server";
import { Quick } from "@mvdlei/edge";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/log";

const schema = z.object({
  domain: z.string(),
  url: z.string(),
  key: z.string(),
});

export const POST = async (req: NextRequest) => {
  try {
    logger.log("Request body", req.body);
    const body = schema.safeParse(await req.json());
    if (!body.success) {
      return Quick.status(Quick.STATUS_CODES.BAD_REQUEST).json(body.error);
    }

    // const link = await prisma.link.create({
    //   data: {
    //     domain: body.data.domain,
    //     url: body.data.url,
    //     key: body.data.key,
    //   },
    // });

    return Quick.status(Quick.STATUS_CODES.CREATED).json({ link: "link" });
  } catch (e) {
    return Quick.status(Quick.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: e instanceof Error ? e.message : "An error occurred",
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (_req: NextRequest) => {
  try {
    const links = await prisma.link.findMany();
    return Quick.status(Quick.STATUS_CODES.OK).json(links);
  } catch (e) {
    return Quick.status(Quick.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: e instanceof Error ? e.message : "An error occurred",
    });
  }
};
