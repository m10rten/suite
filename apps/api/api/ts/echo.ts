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
      return Response.json(
        {
          error: result.error,
        },
        {
          status: 400,
        },
      );
    }
    return Response.json({
      message: `You said: ${result.data.message}`,
    });
  } catch (error) {
    if (error instanceof Error)
      return Response.json(
        {
          error: error?.message || "Undefined error",
        },
        {
          status: 500,
        },
      );
    else
      return Response.json(
        {
          error: "Unknown error",
        },
        {
          status: 500,
        },
      );
  }
}
