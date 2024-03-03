/* eslint-disable no-console */
import express from "express";

import { Data, mySchema } from "./webhook_server";

const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace r {
  // API built-in types
  export type CreateEvent<TData extends Record<string, unknown>> = {
    event: string;
    data: TData;
  };
  export type Infer<T> = T extends CreateEvent<infer U> ? U : never;
}

// client is mocked with the browser making a GET request with query parameters, but this should be an API call like <module>.call, or REST like `POST /event`

app.get("/event", async (req, _res) => {
  const parsed = mySchema.safeParse(req.query);
  if (!parsed.success) {
    return _res.status(400).json({ error: parsed.error });
  }
  const data = parsed.data satisfies Data;

  const response = await fetch("http://localhost:8000/webhook", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const json = await response.json();
  console.log(json);
  return _res.json(json);
});

app.listen(8080, () => {
  console.log("[ ⚡ ]: Server is running on: http://localhost:8080/");
});
