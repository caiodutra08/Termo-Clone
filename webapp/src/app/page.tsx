"use client";

import React, { KeyboardEvent } from "react";

export default function Home() {
	const [thisRow, setThisRow] = React.useState<number>(0);
	const [word, setWord] = React.useState<string>("");
	const divRef = React.useRef<HTMLDivElement>();
	const [showNotify, setShowNotify] = React.useState<boolean>(false);

	React.useEffect(() => {
		setWord("Salve");
		setThisRow(0);
	}, []);

	React.useEffect(() => {
		function handleSubmit(e: any) {
			if (e.key === "Enter") {
				setShowNotify(false);
				const allDivs = document.querySelectorAll(
					`div[data-row='${thisRow}'] div[data-config='ipt']`
				);

				if (
					Array.from(allDivs).some((div) => {
						if (div.textContent === "") {
							return false;
						}
					})
				) {
					//call api
				} else {
					setTimeout(() => setShowNotify(true), 1);
				}
			}
		}

		document.body.addEventListener("keydown", (e) => handleSubmit(e));

		return () => {
			document.body.removeEventListener("keydown", handleSubmit);
		};
	}, []);

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
					<h1 className="text-4xl font-extrabold">Termo da Aliexpress</h1>
				</header>
				<div className="flex items-center justify-center h-14 m-6">
					<div
						className={`py-2 rounded-lg px-4 bg-blue-400 flex justify-center items-center notify ${
							showNotify ? "show" : "hidden"
						}`}
					>
						só palavras com 5 letras
					</div>
				</div>
				<div className="flex flex-col align-center w-full gap-2 h-full">
					{[0, 1, 2, 3, 4, 5].map((row) => (
						<div
							key={row}
							data-row={row}
							className="flex flex-row justify-center gap-2"
						>
							{[0, 1, 2, 3, 4].map((lid) =>
								thisRow === row ? (
									<div
										key={`${row}-${lid}`}
										className={`rounded-[10%] border-[0.175em] focus:outline-none border-neutral-800 w-20 h-20 text-center bg-gray-500 caret-transparent flex justify-center items-center text-4xl font-extrabold cursor-pointer ${
											lid === 0 && row === 0 ? " edit" : ""
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
										data-lid={lid}
										tabIndex={-1}
									/>
								) : (
									<div
										key={`${row}-${lid}`}
										className={`rounded-md border-[0.125em] border-none w-20 h-20 text-center bg-gray-600
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
