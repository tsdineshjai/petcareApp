"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { logOut } from "@/app/actions/actions";

function SignoutButton() {
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			disabled={isPending}
			onClick={async () => {
				startTransition(async () => {
					await logOut();
				});
			}}
			variant={"default"}
		>
			Sign Out
		</Button>
	);
}

export default SignoutButton;
