"use client";

import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const linkClassName = `text-[11px]  mr-1 ml-1 hover:bg-pink-800 cursor-pointer rounded-lg px-1`;

function Header() {
	const pathName = usePathname();
	return (
		<header className="flex flex-row justify-between border-b border-white/30  pb-1 items-center py-1 ">
			<Logo />
			<section>
				<Link href={"/app/dashboard"}>
					<button
						className={cn(`${linkClassName}`, {
							"bg-pink-800": "/app/dashboard" == pathName,
						})}
					>
						Dashboard
					</button>
				</Link>

				<Link href={"/app/account"}>
					<button
						className={cn(`${linkClassName}`, {
							"bg-pink-800": "/app/account" == pathName,
						})}
					>
						Account
					</button>
				</Link>
			</section>
		</header>
	);
}

export default Header;
