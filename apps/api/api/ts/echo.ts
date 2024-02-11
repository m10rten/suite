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
}
