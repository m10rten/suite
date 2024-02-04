/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import grpc, { Server, ServerCredentials } from "@grpc/grpc-js";

import { echo } from "../echo/.gen/echo";
import { EchoServiceService } from "../echo/.gen/echo_grpc_pb";

class EchoService {
  [method: string]: grpc.UntypedHandleCall;
  echo(
    call: grpc.ServerUnaryCall<echo.Message, echo.Message>,
    callback: grpc.sendUnaryData<echo.Message>,
  ) {
    console.log("Received message:", call.request.toObject());

    callback(null, call.request);
  }
}

async function main() {
  const server = new Server();
  server.addService(EchoServiceService, new EchoService());
  server.bindAsync(
    "localhost:50051",
    ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Server listening on ${port}`);
      server.start();
    },
  );
}

main();
