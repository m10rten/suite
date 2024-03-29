/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 4.25.2
 * source: echo.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
/* eslint-disable */
// @ts-nocheck
import * as grpc_1 from "@grpc/grpc-js";
import * as pb_1 from "google-protobuf";

export namespace echo {
  export class Message extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(
      data?:
        | any[]
        | {
            body?: string;
          },
    ) {
      super();
      pb_1.Message.initialize(
        this,
        Array.isArray(data) ? data : [],
        0,
        -1,
        [],
        this.#one_of_decls,
      );
      if (!Array.isArray(data) && typeof data == "object") {
        if ("body" in data && data.body != undefined) {
          this.body = data.body;
        }
      }
    }
    get body() {
      return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
    }
    set body(value: string) {
      pb_1.Message.setField(this, 1, value);
    }
    static fromObject(data: { body?: string }): Message {
      const message = new Message({});
      if (data.body != null) {
        message.body = data.body;
      }
      return message;
    }
    toObject() {
      const data: {
        body?: string;
      } = {};
      if (this.body != null) {
        data.body = this.body;
      }
      return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
      const writer = w || new pb_1.BinaryWriter();
      if (this.body.length) writer.writeString(1, this.body);
      if (!w) return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Message {
      const reader =
          bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes),
        message = new Message();
      while (reader.nextField()) {
        if (reader.isEndGroup()) break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.body = reader.readString();
            break;
          default:
            reader.skipField();
        }
      }
      return message;
    }
    serializeBinary(): Uint8Array {
      return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): Message {
      return Message.deserialize(bytes);
    }
  }
  interface GrpcUnaryServiceInterface<P, R> {
    (
      message: P,
      metadata: grpc_1.Metadata,
      options: grpc_1.CallOptions,
      callback: grpc_1.requestCallback<R>,
    ): grpc_1.ClientUnaryCall;
    (
      message: P,
      metadata: grpc_1.Metadata,
      callback: grpc_1.requestCallback<R>,
    ): grpc_1.ClientUnaryCall;
    (
      message: P,
      options: grpc_1.CallOptions,
      callback: grpc_1.requestCallback<R>,
    ): grpc_1.ClientUnaryCall;
    (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
  }
  interface GrpcStreamServiceInterface<P, R> {
    (
      message: P,
      metadata: grpc_1.Metadata,
      options?: grpc_1.CallOptions,
    ): grpc_1.ClientReadableStream<R>;
    (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
  }
  interface GrpWritableServiceInterface<P, R> {
    (
      metadata: grpc_1.Metadata,
      options: grpc_1.CallOptions,
      callback: grpc_1.requestCallback<R>,
    ): grpc_1.ClientWritableStream<P>;
    (
      metadata: grpc_1.Metadata,
      callback: grpc_1.requestCallback<R>,
    ): grpc_1.ClientWritableStream<P>;
    (
      options: grpc_1.CallOptions,
      callback: grpc_1.requestCallback<R>,
    ): grpc_1.ClientWritableStream<P>;
    (callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
  }
  interface GrpcChunkServiceInterface<P, R> {
    (
      metadata: grpc_1.Metadata,
      options?: grpc_1.CallOptions,
    ): grpc_1.ClientDuplexStream<P, R>;
    (options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
  }
  interface GrpcPromiseServiceInterface<P, R> {
    (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): Promise<R>;
    (message: P, options?: grpc_1.CallOptions): Promise<R>;
  }
  export abstract class UnimplementedEchoServiceService {
    static definition = {
      Echo: {
        path: "/echo.EchoService/Echo",
        requestStream: false,
        responseStream: false,
        requestSerialize: (message: Message) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes: Buffer) =>
          Message.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message: Message) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes: Buffer) =>
          Message.deserialize(new Uint8Array(bytes)),
      },
    };
    [method: string]: grpc_1.UntypedHandleCall;
    abstract Echo(
      call: grpc_1.ServerUnaryCall<Message, Message>,
      callback: grpc_1.sendUnaryData<Message>,
    ): void;
  }
  export class EchoServiceClient extends grpc_1.makeGenericClientConstructor(
    UnimplementedEchoServiceService.definition,
    "EchoService",
    {},
  ) {
    constructor(
      address: string,
      credentials: grpc_1.ChannelCredentials,
      options?: Partial<grpc_1.ChannelOptions>,
    ) {
      super(address, credentials, options);
    }
    Echo: GrpcUnaryServiceInterface<Message, Message> = (
      message: Message,
      metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<Message>,
      options?: grpc_1.CallOptions | grpc_1.requestCallback<Message>,
      callback?: grpc_1.requestCallback<Message>,
    ): grpc_1.ClientUnaryCall => {
      return super.Echo(message, metadata, options, callback);
    };
  }
}
