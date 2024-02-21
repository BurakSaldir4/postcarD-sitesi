"use client";

import { Navbar, NavbarContent, NavbarItem, Link, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function Menu() {
	// const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// useEffect(() => {
	// 	setMounted(true);
	// }, []);

	// if (!mounted) return null;
	return (
		<Navbar>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="/post/ekle">
						Yeni Post
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="/" aria-current="page">
						Postlar
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Switch
						defaultSelected
						size="lg"
						color="danger"
						// startContent="Açık Tema"
						// endContent="Koyu Tema"
						onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					/>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
