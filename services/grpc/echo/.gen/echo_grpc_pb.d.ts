export namespace EchoServiceService {
  namespace echo {
    export let path: string;
    export let requestStream: boolean;
    export let responseStream: boolean;
    export let requestType: any;
    export let responseType: any;
    export { serialize_echo_Message as requestSerialize };
    export { deserialize_echo_Message as requestDeserialize };
    export { serialize_echo_Message as responseSerialize };
    export { deserialize_echo_Message as responseDeserialize };
  }
}
declare const EchoServiceClient: grpc.ServiceClientConstructor;
declare function serialize_echo_Message(arg: any): Buffer;
declare function deserialize_echo_Message(buffer_arg: any): any;
import grpc = require("@grpc/grpc-js");
export {};
