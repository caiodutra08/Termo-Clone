"use client";

import axios from "axios";
import React, { KeyboardEvent } from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
	useDisclosure,
	Button,
} from "@chakra-ui/react";

enum LetterStatus {
	CORRECT = "CORRECT",
	INCORRECT = "INCORRECT",
	MISSING = "MISSING",
}

export default function Home() {
	const [thisRow, setThisRow] = React.useState<number>(0);
	const divRef = React.useRef<HTMLDivElement>();
	const [showNotify, setShowNotify] = React.useState<boolean>(false);
	const [data, setData] = React.useState<Record<string, LetterStatus> | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement | null>(null);
	const [word, setWord] = React.useState<string>("");
	const [mode, setMode] = React.useState<"win" | "lose">();
	const [guesses, setGuesses] = React.useState<number>(0);

	React.useEffect(() => {
		const handleSubmit = async (e: any) => {
			if (e.key === "Enter") {
				setShowNotify(false);

				const allDivs = document.querySelectorAll(
					`div[data-row='${thisRow}'] div[data-config='ipt']`
				);

				const allDivsFilled = Array.from(allDivs).every((div) => div.textContent !== "");

				if (allDivsFilled) {
					const word = Array.from(allDivs)
						.map((div) => div.textContent)
						.join("");

					if (word.length === 5 && word.match(/^[a-z]+$/i)) {
						const response = await axios.get(
							`http://localhost:8081/api/palavra/verificar?palavraDigitada=${word}`
						);

						const data: Record<string, LetterStatus> = response.data;

						if (data) {
							setThisRow((prev) => prev + 1);
							setData(data);
						}
					} else {
						setTimeout(() => setShowNotify(true), 1);
					}
				} else {
					console.log();
					setTimeout(() => setShowNotify(true), 1);
				}
			}
		};

		document.addEventListener("keydown", handleSubmit, true);

		return () => {
			document.removeEventListener("keydown", handleSubmit, true);
		};
	}, [thisRow, setShowNotify, setThisRow]);

	React.useEffect(() => {
		if (data) {
			const updatedAllDivs = document.querySelectorAll(
				`div[data-row='${thisRow - 1}'] div[data-config='opt']`
			);

			(async () => {
				updatedAllDivs.forEach((div, i) => {
					const htmlDiv = div as HTMLDivElement;
					switch (data[i]) {
						case LetterStatus.CORRECT:
							htmlDiv.classList.add("bg-green-500");
							break;
						case LetterStatus.INCORRECT:
							htmlDiv.classList.add("bg-yellow-500");
							break;
						default:
							htmlDiv.classList.add("bg-gray-700");
							break;
					}
				});
			})().then(() => {
				const arrData = Object.values(data);

				if (arrData.every((letter) => letter === LetterStatus.CORRECT)) {
					setMode("win");
					setGuesses(thisRow);
					setThisRow(6);
					setData(null);
					axios
						.get("http://localhost:8081/api/palavra/atual")
						.then((response) => {
							setWord(response.data);
							onOpen();
						})
						.catch((err) => console.log(err));
				} else if (thisRow === 6) {
					setMode("lose");
					setThisRow(6);
					setData(null);
					axios
						.get("http://localhost:8081/api/palavra/atual")
						.then((response) => {
							setWord(response.data);
							onOpen();
						})
						.catch((err) => console.log(err));
				}
			});
		}
	}, [data, thisRow]);

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

	const createDialog = (mode: string, word: string) => {
		switch (mode) {
			case "win":
				return (
					<AlertDialog
						motionPreset="slideInBottom"
						leastDestructiveRef={cancelRef}
						onClose={onClose}
						isOpen={isOpen}
						isCentered
					>
						<AlertDialogOverlay />
						<AlertDialogContent>
							<AlertDialogHeader className="text-gray-950">
								Você ganhou!
							</AlertDialogHeader>
							<AlertDialogCloseButton />
							<AlertDialogBody className="text-gray-950">
								Você acertou em {guesses}{" "}
								{guesses === 1 ? "tentativa" : "tentativas"}. 🎉
							</AlertDialogBody>
							<AlertDialogFooter>
								<Button ref={cancelRef} onClick={onClose}>
									Legal!
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				);
			case "lose":
				return (
					<AlertDialog
						motionPreset="slideInBottom"
						leastDestructiveRef={cancelRef}
						onClose={onClose}
						isOpen={isOpen}
						isCentered
					>
						<AlertDialogOverlay />
						<AlertDialogContent>
							<AlertDialogHeader className="text-gray-950">
								Você perdeu.
							</AlertDialogHeader>
							<AlertDialogCloseButton />
							<AlertDialogBody className="text-gray-950">
								A palavra era {word.toLocaleUpperCase()}. 💀
							</AlertDialogBody>
							<AlertDialogFooter>
								<Button ref={cancelRef} onClick={onClose}>
									Ok.
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				);
		}
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
							{[0, 1, 2, 3, 4].map((lid) => (
								<div
									key={lid}
									className={`${
										thisRow === row
											? `rounded-[10%] border-[0.175em] focus:outline-none border-neutral-800 w-20 h-20 text-center bg-gray-500 caret-transparent flex justify-center items-center text-4xl font-extrabold cursor-pointer ${
													lid === 0 && row === 0 ? " edit" : ""
											  }`
											: `rounded-md border-[0.125em] border-none w-20 h-20 text-center bg-gray-600 caret-transparent flex justify-center items-center text-4xl font-extrabold pointer-events-none`
									}`}
									autoFocus={lid === 0 && row === 0}
									data-config={thisRow === row ? "ipt" : "opt"}
									onKeyDown={thisRow === row ? handleKeyDown : () => {}}
									onClick={handleClick}
									onBlur={(e) => {
										lid !== 4
											? divRef.current?.focus()
											: e.currentTarget.classList.remove("edit");
									}}
									data-lid={lid}
									tabIndex={-1}
								/>
							))}
						</div>
					))}
				</div>
				{word && mode && createDialog(mode, word)}
			</main>
		</>
	);
}
