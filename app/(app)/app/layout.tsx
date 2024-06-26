import Header from "@/components/app-header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/petListProvider";
import PetSearchContextProvider from "@/contexts/petSearchProvider";
import prisma from "@/lib/db";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";

type LayoutProps = {
	children: React.ReactNode;
};

async function Layout({ children }: LayoutProps) {
	const session = await checkAuth();

	console.log(session?.user);
	const pets = await getPetsByUserId(session.user.id);

	return (
		<main className="min-h-[255px]  bg-pink-600 relative  text-white">
			<section className=" flex flex-col  w-2/3 absolute min-h-screen  top-0 left-[50%] -translate-x-[50%]   border-gray-600 ">
				<Header />
				<PetSearchContextProvider>
					<PetContextProvider data={pets}>
						<article> {children}</article>
					</PetContextProvider>
				</PetSearchContextProvider>
				<Footer />
			</section>
			<Toaster position={"top-right"} />
		</main>
	);
}

export default Layout;
