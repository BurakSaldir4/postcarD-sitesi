"use client";

import { Button, Spinner } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function MyButton({ children, ...props }) {
	const { pending } = useFormStatus();
	return (
		<Button isDisabled={pending} {...props}>
			{pending ? <Spinner size="md" /> : children}
		</Button>
	);
}
