"use client";

import React from "react";
import { Button } from "./ui/button";
import { signout } from "@/app/actions/actions";

function SignoutButton() {
	return (
		<Button onClick={() => signout()} variant={"default"}>
			Sign Out
		</Button>
	);
}

export default SignoutButton;
