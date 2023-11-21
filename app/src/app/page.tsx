"use client";

import React, { KeyboardEvent } from "react";
import * as ReactDOm from "react-dom";

export default function Home() {
  const [step, setStep] = React.useState();
  const [word, setWord] = React.useState("");
  const divRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    setWord("Dildo");
    const allIptDivs = document.querySelectorAll("div[data-config='ipt']");
    const editDiv = document.querySelector("edit") as HTMLDivElement;
    if (editDiv) {
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      const nextSibling = e.currentTarget?.nextElementSibling as HTMLDivElement;
      if (nextSibling) {
        divRef.current = nextSibling;
        divRef.current.focus();
      }
    } else if (e.key === "ArrowLeft") {
      const previousSibling = e.currentTarget
        ?.previousSibling as HTMLDivElement;
      if (previousSibling) {
        divRef.current = previousSibling;
        divRef.current.focus();
      }
    } else {
      const nextSibling = e.currentTarget?.nextElementSibling as HTMLDivElement;
      if (nextSibling) {
        divRef.current = nextSibling;
        divRef.current.focus();
      }
    }
  };

  return (
    <>
      <main className="bg-zinc-700 w-full h-fh">
        <header className="flex items-center justify-center w-full p-2">
          <h1 className="">Termo da Shopee</h1>
        </header>
        <div className="flex flex-col align-center justify-center w-full">
          <div className="flex flex-row justify-center gap-4">
            <input
              className="rounded-md border-2 border-neutral-950 w-12 h-12 text-center focus:outline-none bg-white edit"
              data-config="ipt"
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
            <input
              className="rounded-md border-2 border-neutral-950 w-12 h-12 text-center focus:outline-none bg-white"
              data-config="ipt"
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
          </div>
          <div className="flex"></div>
        </div>
      </main>
    </>
  );
}
