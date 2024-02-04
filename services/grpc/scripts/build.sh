#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

# mkdir -p ./src/grpc/proto
# mkdir -p ./src/grpcjs/proto
mkdir -p ./echo/.gen

# # grpc
# # JavaScript code generating
# ./node_modules/.bin/grpc_tools_node_protoc \
# --js_out=import_style=commonjs,binary:./src/grpc/proto \
# --grpc_out=./src/grpc/proto \
# --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
# -I ./proto \
# proto/*.proto

# ./node_modules/.bin/grpc_tools_node_protoc \
# --plugin=protoc-gen-ts=../bin/protoc-gen-ts \
# --ts_out=./src/grpc/proto \
# -I ./proto \
# proto/*.proto

# grpc-js
# JavaScript code generating
./node_modules/.bin/grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:./echo/.gen \
--grpc_out=grpc_js:./echo/.gen \
-I ./ \
echo.proto

./node_modules/.bin/grpc_tools_node_protoc \
--plugin=protoc-gen-ts=../bin/protoc-gen-ts \
--ts_out=grpc_js:./echo/.gen \
-I ./ \
echo.proto

# TypeScript compiling
# mkdir -p build/grpc/proto
# cp -r ./src/grpc/proto/* build/grpc/proto

# mkdir -p build/grpcjs/proto
# cp -r ./echo/.gen/* build/grpcjs/proto

tsc