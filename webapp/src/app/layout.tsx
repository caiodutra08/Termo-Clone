import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jogo Termo",
	description:
		"O jogo termo, é um jogo de adivinhação de palavra, onde o jogador tem que adivinhar a palavra do dia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
