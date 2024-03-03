/* eslint-disable no-console */
import express from "express";
import { z } from "zod";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

type CreateEvent<TData extends Record<string, unknown>> = {
  event: string;
  data: TData;
};

const myEvent: CreateEvent<{ name: string }> = {
  event: "user_created",
  data: {
    name: "John Doe",
  },
};

type Infer<T> = T extends CreateEvent<infer U> ? U : never;

export type Data = Infer<typeof myEvent>;

app.get("/event", async (req, _res) => {
  const mySchema = z.object({
    name: z.string(),
  });
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
