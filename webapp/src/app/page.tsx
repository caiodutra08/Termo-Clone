"use client";

import React, { KeyboardEvent } from "react";

export default function Home() {
	const [thisRow, setThisRow] = React.useState<number>(0);
	const [word, setWord] = React.useState<string>("");
	const divRef = React.useRef<HTMLDivElement>();

	React.useEffect(() => {
		setWord("Salve");
		setThisRow(0);
	}, []);

	React.useEffect(() => {

		function handleSubmit(e: any) {
			if (e.key === "Enter") {
				const allDivs = document.querySelectorAll(`[data-config='ipt'][data-row='${thisRow}']`)

				if (Array.from(allDivs).some((div) => {
					if (div.textContent === "") {
						return false;
					}
				})) {
					//call api
					
				}
			}
		}

		document.body.addEventListener("keydown", (e) => handleSubmit(e))

		return document.body.removeEventListener("keydown", handleSubmit);
	})

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		switch (e.key) {
			case "ArrowRight": {
				const nextSibling = e.currentTarget?.nextElementSibling as HTMLDivElement;
				if (nextSibling) {
					divRef.current = nextSibling;
					changeEditDiv(nextSibling);
				}
				break;
			}
			case "ArrowLeft": {
				const previousSibling = e.currentTarget?.previousSibling as HTMLDivElement;
				if (previousSibling) {
					divRef.current = previousSibling;
					changeEditDiv(previousSibling);
				}
				break;
			}
			case "Backspace": {
				e.currentTarget.textContent = "";
				const previousSibling = e.currentTarget?.previousSibling as HTMLDivElement;
				if (previousSibling) {
					divRef.current = previousSibling;
					changeEditDiv(previousSibling);
				}
				break;
			}
			default: {
				e.preventDefault();
				const letter = e.key;
				if (letter.match(/^[a-z]$/i)) {
					e.currentTarget.textContent = letter.toLocaleUpperCase();
					const nextSibling = e.currentTarget?.nextElementSibling as HTMLDivElement;
					if (nextSibling) {
						divRef.current = nextSibling;
						changeEditDiv(nextSibling);
					}

					if (e.currentTarget.dataset.lid === "4") {
						e.currentTarget.blur();
						document.body.focus();
					}
				}
				break;
			}
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		changeEditDiv(e.currentTarget);
	};

	function changeEditDiv(thisDiv: HTMLDivElement) {
		const divs = document.querySelectorAll("div.edit");
		divs.forEach((div) => div.classList.remove("edit"));
		divRef.current = thisDiv;
		divRef.current.focus();
		divRef.current.classList.add("edit");
	}

	return (
		<>
			<main className="bg-zinc-700 w-full h-fh flex flex-col">
				<header className="flex items-center justify-center w-full p-2">
					<h1 className="text-4xl font-extrabold">Termo da Shopee</h1>
				</header>
				<div className="flex flex-col align-center w-full gap-2 h-full">
					{[0, 1, 2, 3, 4].map((row) => (
						<div key={row} className="flex flex-row justify-center gap-2">
							{[0, 1, 2, 3, 4].map((lid) =>
								thisRow === row ? (
									<div
										key={`${row}-${lid}`}
										className={`rounded-[10%] border-[0.175em] focus:outline-none border-neutral-950 w-20 h-20 text-center bg-white caret-transparent flex justify-center items-center text-4xl font-extrabold cursor-pointer ${lid === 0 && row === 0 ? " edit" : ""
											}`}
										autoFocus={lid === 0 && row === 0}
										data-config="ipt"
										onKeyDown={handleKeyDown}
										onClick={handleClick}
										onBlur={(e) => {
											lid !== 4
												? divRef.current?.focus()
												: e.currentTarget.classList.remove("edit");
										}}
										data-row={row}
										data-lid={lid}
										tabIndex={-1}
									/>
								) : (
									<div
										key={`${row}-${lid}`}
										className={`rounded-md border-[0.125em] border-none w-20 h-20 text-center bg-gray-500
										 caret-transparent flex justify-center items-center text-4xl font-extrabold pointer-events-none`}
									/>
								)
							)}
						</div>
					))}
					<div className="flex"></div>
				</div>
			</main>
		</>
	);
}
