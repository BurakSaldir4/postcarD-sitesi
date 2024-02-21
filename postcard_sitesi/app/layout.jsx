import Menu from "@/components/Menu";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

export default function layout({ children }) {
	return (
		<html lang="tr">
			<body suppressHydrationWarning>
				<Providers>
					<Menu />
					<main>{children}</main>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
