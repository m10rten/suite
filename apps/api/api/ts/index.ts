export async function GET() {
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
      ],
    },
    {
      status: 200,
    },
  );
}
