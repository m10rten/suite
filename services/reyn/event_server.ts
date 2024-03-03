/* eslint-disable no-console */
import express from "express";
import { z } from "zod";

import { validateEvent } from "./shared";

const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// client is mocked with the browser making a GET request with query parameters, but this should be an API call like <module>.call, or REST like `POST /event`

app.get("/event", async (req, res) => {
  try {
    const event = await validateEvent("register_user", req.query);

    const response = await fetch("http://localhost:8000/webhook", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    console.log(`[ 🎈 ]: Response from Webhook: ${JSON.stringify(json)}`);
    return res.json(json);
  } catch (error) {
    if (!(error instanceof Error)) {
      return res.status(500).json({ message: "Error", error: "Unknown error" });
    }
    if (error instanceof z.ZodError) {
      console.error(`[ ❌ ]: Error: ${error.message}`);
      return res.status(400).json({ message: "Error", error });
    } else return res.status(500).json({ message: "Error", error: error.message });
  }
});

app.listen(8080, () => {
  console.log("[ ⚡ ]: Server is running on: http://localhost:8080/");
});
