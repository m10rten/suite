/* eslint-disable no-console */
import * as grpc from "@grpc/grpc-js";

import { echo } from "../echo/.gen/echo";

async function main() {
  try {
    const c = new echo.EchoServiceClient(
      "localhost:50051",
      grpc?.credentials?.createInsecure(),
    );
    const message = new echo.Message({
      body: "Hello from index.ts client!",
    });
    console.log("Sending message:", message.toObject());

    c.Echo(message, (err, response) => {
      console.log("Received message:", response?.toObject());
      console.log("possible error:", err);

      if (err) {
        console.error(err);
        return;
      }
      console.log(response?.body);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
