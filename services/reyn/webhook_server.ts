/* eslint-disable no-console */
import express from "express";
import { z } from "zod";

import { r } from "./event_server";

export const mySchema = z.object({
  name: z.string(),
});
type Schema = z.infer<typeof mySchema>;

const myEvent: r.CreateEvent<Schema> = {
  event: "user_created",
  data: {
    name: "John Doe",
  },
};
export type Data = r.Infer<typeof myEvent>;

const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.post("/webhook", (req, res) => {
  const data: Data = req.body;
  res.json({ message: "Webhook received!", data });
});

app.listen(8000, () => {
  console.log("[ 🔥 ]: Server is running on: http://localhost:8000/");
});
