export async function GET() {
  type Route =
    | {
        method: string;
        path: string;
      }
    | {
        method: "POST";
        body: Record<string, string>;
      };
  return Response.json(
    {
      routes: [
        {
          method: "GET",
          path: "/",
        },
        {
          method: "GET",
          path: "/api/echo",
        },
        {
          method: "POST",
          path: "/api/echo",
          body: {
            message: "string",
          },
        },
      ] satisfies Route[],
    },
    {
      status: 200,
    },
  );
}
