import { Quick } from "@mvdlei/edge";
import { z } from "zod";

export async function GET() {
  return Response.json({
    message: "Hello, world!",
  });
}

const echoSchema = z
  .object({
    message: z.string(),
  })
  .strict();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = echoSchema.safeParse(body);
    if (!result.success) {
      return Quick.status(Quick.STATUS_CODES.BAD_REQUEST).json({
        error: result.error,
      });
    }
    return Quick.json({
      message: `You said: ${result.data.message}`,
    });
  } catch (error) {
    return Quick.status(Quick.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
