import ContentBlock from "@/components/contentBlock";
import H1 from "@/components/h1";
import React from "react";

function Account() {
	return (
		<main>
			<H1 className="my-[1.5rem] text-lg font-serif">Your Account</H1>

			<ContentBlock className="min-h-[350px] text-black/90 flex justify-center items-center">
				<h2>Loading...</h2>
			</ContentBlock>
		</main>
	);
}

export default Account;
