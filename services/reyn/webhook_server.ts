/* eslint-disable no-console */
import express from "express";

import { Data, r } from "./shared";

const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.post("/webhook", (req, res) => {
  const event: r.Event<Data> = req.body;
  console.log(`[ 🎉 ]: Webhook received: ${JSON.stringify(event)}`);
  res.json({ message: "Webhook received!", event });
});

app.listen(8000, () => {
  console.log("[ 🔥 ]: Server is running on: http://localhost:8000/");
});
