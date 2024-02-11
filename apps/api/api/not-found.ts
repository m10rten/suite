import { Quick } from "@mvdlei/edge";

export async function GET() {
  return Quick.status(Quick.STATUS_CODES.NOT_FOUND).json({ error: "Not found" });
}
