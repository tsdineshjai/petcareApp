"use client";

import { logIn, signUp } from "@/app/actions/actions";
import AuthFormButton from "./auth-form-button";

import { useFormState } from "react-dom";

type AuthFormProps = {
	type: "logIn" | "signUp";
};

function AuthForm({ type }: AuthFormProps) {
	const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
	const [logInError, dispatchLogIn] = useFormState(logIn, undefined);

	return (
		<form action={type === "logIn" ? dispatchLogIn : dispatchSignUp}>
			{" "}
			<label className="block" htmlFor="Email">
				Email
			</label>
			<input
				type="email"
				name="email"
				id="Email"
				className="rounded-sm mt-1 px-1 py-2  mb-2"
				required={true}
			/>
			<label className="block" htmlFor="passwd">
				Password
			</label>
			<input
				type="password"
				name="password"
				id="passwd"
				className="rounded-sm mt-1 px-1 py-2  mb-2"
				required={true}
			/>
			<AuthFormButton type={type} />
			{signUpError && (
				<p className="text-red-500 text-sm mt-2 text-center ">
					{signUpError.message}
				</p>
			)}
			{logInError && (
				<p className="text-red-500 text-sm mt-2 text-center">
					{logInError.message}
				</p>
			)}
		</form>
	);
}

export default AuthForm;
