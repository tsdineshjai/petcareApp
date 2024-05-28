"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AuthForm() {
	const pathname = usePathname();
	return (
		<>
			<section>
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
			</section>		
		</>
	);
}

export default AuthForm;
