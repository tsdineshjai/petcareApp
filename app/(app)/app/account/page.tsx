import { checkAuth } from "@/lib/server-utils";

import ContentBlock from "@/components/contentBlock";
import H1 from "@/components/h1";
import SignoutButton from "@/components/sign-out-button";

async function Account() {
	const session = await checkAuth();

	return (
		<main>
			<H1 className="my-[1.5rem] text-lg font-serif">Your Account</H1>
			<ContentBlock className="min-h-[350px] text-black/90 flex flex-col gap-5 justify-center items-center">
				<h2>Logged in as {session.user.email}</h2>
				<SignoutButton />
			</ContentBlock>
		</main>
	);
}

export default Account;
