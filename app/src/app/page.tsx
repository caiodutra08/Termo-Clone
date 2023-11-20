"use client";

import React from "react";

export default function Home() {
  const [step, setStep] = React.useState();
  const [word, setWord] = React.useState("");

  React.useEffect(() => {
    setWord("Dildo");
    const allIptDivs = document.querySelectorAll("div[data-config='ipt']")
    allIptDivs.forEach((el) => {
      el.addEventListener("keydown", (e) => {
        if (e.keyCode === "39") {
          
        }
      })
    })
  }, []);

  return (
    <>
      <main className="bg-zinc-700 w-full h-fh">
        <header className="flex items-center justify-center w-full p-2">
          <h1 className="">Termo da Shopee</h1>
        </header>
        <div className="flex flex-col align-center justify-center w-full">
          <div className="flex flex-row justify-center gap-4">
            <div className="rounded-md border-2 border-neutral-950 w-12 h-12 text-center bg-white edit" data-config="ipt" />
            <div className="rounded-md border-2 border-neutral-950 w-12 h-12 text-center bg-white" data-config="ipt"/>
          </div>
          <div className="flex"></div>
        </div>
      </main>
    </>
  );
}
