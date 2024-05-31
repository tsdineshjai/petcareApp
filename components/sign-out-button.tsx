"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { signout } from "@/app/actions/actions";

function SignoutButton() {
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			disabled={isPending}
			onClick={async () => {
				startTransition(async () => {
					await signout();
				});
			}}
			variant={"default"}
		>
			Sign Out
		</Button>
	);
}

export default SignoutButton;
