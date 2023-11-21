"use client";

import React, { KeyboardEvent } from "react";
import * as ReactDOm from "react-dom";

export default function Home() {
	const [row, setRow] = React.useState<number>();
	const [word, setWord] = React.useState<string>("");
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
			const previousSibling = e.currentTarget?.previousSibling as HTMLDivElement;
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
			<main className="bg-zinc-700 w-full h-fh flex flex-col">
				<header className="flex items-center justify-center w-full p-2">
					<h1 className="text-4xl">Termo da Shopee</h1>
				</header>
				<div className="flex flex-col align-center w-full gap-1 h-full">
					{[0, 1, 2, 3, 4].map((row) => (
						<div key={row} className="flex flex-row justify-center gap-1">
							{[0, 1, 2, 3, 4].map((lid) => (
								<input
									key={`${row}-${lid}`}
									className="rounded-md border-4 border-neutral-950 w-20 h-20 text-center focus:outline-none focus:border-b-slate-950 focus:border-b-[12px] bg-white edit caret-transparent cursor-pointer"
									data-config="ipt"
									onKeyDown={handleKeyDown}
									maxLength={1}
								/>
							))}
						</div>
					))}
					<div className="flex"></div>
				</div>
			</main>
		</>
	);
}
