/* eslint-disable no-console */
"use client";

import { useState } from "react";
import {
  useAsync,
  useCopyToClipboard,
  useDebounce,
  useKey,
  useLocalStorage,
  useOnce,
} from "@mvdlei/hooks";

import { Button } from "#/ui/button";
import { Input } from "#/ui/input";

const name = "mvdlei_suite_counter";
export default function TestBlock() {
  const [get, set] = useLocalStorage(name, 0);
  const { error, execute, result, loading } = useAsync(async () => {
    console.log("start");
    const r = Math.random();
    await new Promise((res) => setTimeout(res, 1000));
    if (r < 0.5) throw new Error("random error");
    console.log("end");
    return "done";
  });
  const pressed = useKey("ArrowUp");
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);
  const [mounted, setMounted] = useState(false);
  useOnce(() => {
    setMounted(true);
  });
  const [_, copy] = useCopyToClipboard();

  return (
    <>
      <section className="flex gap-2 flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">useLocalStorage</h2>
        <div className="flex gap-2 justify-center items-center">
          <Button
            size={"icon"}
            className="text-lg font-bold flex justify-center items-center"
            onClick={() => {
              const prev = get ?? 0;
              set(prev - 1);
            }}>
            -
          </Button>
          <span>{get ?? "loading..."}</span>
          <Button
            size={"icon"}
            className="text-lg font-bold flex justify-center items-center"
            onClick={() => {
              const prev = get ?? 0;
              set(prev + 1);
            }}>
            +
          </Button>
        </div>
      </section>
      <hr className="w-64" />

      <section className="flex gap-2 flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">useAsync</h2>
        <div className="flex gap-2 justify-center items-center">
          <Button
            className="text-lg font-bold flex justify-center items-center"
            onClick={() => {
              execute();
            }}>
            execute
          </Button>
          <span>{loading ? "loading..." : result}</span>
          {error ? <span className="text-red-500">{error.message}</span> : null}
        </div>
      </section>

      <hr className="w-64" />

      <section className="flex gap-2 flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">useKey</h2>
        <div className="flex gap-2 justify-center items-center">
          Arrow up: <span>{pressed ? "pressed" : "not pressed"}</span>
        </div>
      </section>

      <hr className="w-64" />

      <section className="flex gap-2 flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">useDebounce</h2>
        <div className="flex gap-2 flex-col justify-center items-center">
          <Input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <span>debounced: {debouncedInput}</span>
        </div>
      </section>

      <hr className="w-64" />

      <section className="flex gap-2 flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">useOnce</h2>
        <div className="flex gap-2 justify-center items-center">
          <span>{mounted ? "mounted" : "not mounted"}</span>
        </div>
      </section>

      <hr className="w-64" />

      <section className="flex gap-2 flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">useCopyToClipboard</h2>
        <div className="flex gap-2 justify-center items-center">
          <Button
            className="text-lg font-bold flex justify-center items-center"
            onClick={async () => {
              await copy("copied");
            }}>
            copy
          </Button>
        </div>
      </section>
    </>
  );
}
