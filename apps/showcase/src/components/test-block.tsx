"use client";

import { useLocalStorage } from "@mvdlei/hooks";

import { Button } from "#/ui/button";

const name = "mvdlei_suite_counter";
export default function TestBlock() {
  const [get, set] = useLocalStorage(name, 0);

  return (
    <>
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
    </>
  );
}
