"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type AuthFormButtonProps = {
	type: "logIn" | "signUp";
};

function AuthFormButton({ type }: AuthFormButtonProps) {
	const { pending } = useFormStatus();
	return (
		<Button className="block mx-auto mt-3" variant="default" disabled={pending}>
			{type}
		</Button>
	);
}

export default AuthFormButton;
