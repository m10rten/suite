// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("@grpc/grpc-js");
var echo_pb = require("./echo_pb.js");

function serialize_echo_Message(arg) {
  if (!(arg instanceof echo_pb.Message)) {
    throw new Error("Expected argument of type echo.Message");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_echo_Message(buffer_arg) {
  return echo_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

var EchoServiceService = (exports.EchoServiceService = {
  echo: {
    path: "/echo.EchoService/Echo",
    requestStream: false,
    responseStream: false,
    requestType: echo_pb.Message,
    responseType: echo_pb.Message,
    requestSerialize: serialize_echo_Message,
    requestDeserialize: deserialize_echo_Message,
    responseSerialize: serialize_echo_Message,
    responseDeserialize: deserialize_echo_Message,
  },
});

exports.EchoServiceClient = grpc.makeGenericClientConstructor(EchoServiceService);
