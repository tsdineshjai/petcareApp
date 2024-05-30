"use client";

import React from "react";
import { Button } from "./ui/button";
import { login, SignUp } from "@/app/actions/actions";

function AuthForm({ type }: { type: "Login" | "Sign Up" }) {
	return (
		<form action={type === "Login" ? login : SignUp}>
			<div>
				<label htmlFor="Email">Email</label>
			</div>
			<input
				type="email"
				name="email"
				id="Email"
				className="rounded-sm mt-1 px-1 py-2  mb-2"
			/>
			<div>
				<label htmlFor="passwd">Password</label>
			</div>
			<input
				type="password"
				name="password"
				id="passwd"
				className="rounded-sm mt-1 px-1 py-2  mb-2"
			/>
			<Button className="block mx-auto mt-3" variant="default">
				{type}
			</Button>
		</form>
	);
}

export default AuthForm;
