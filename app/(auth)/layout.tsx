import Logo from "@/components/logo";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen">
			<Logo />
			{children}
		</main>
	);
}

export default Layout;
