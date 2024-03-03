/* eslint-disable no-console */
import express from "express";

import { Data } from "./event_server";

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
