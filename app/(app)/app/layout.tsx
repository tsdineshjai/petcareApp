import Header from "@/components/app-header";
import Footer from "@/components/footer";
import PetContextProvider from "@/contexts/petListProvider";
import axios from "axios";

type LayoutProps = {
	children: React.ReactNode;
};

async function Layout({ children }: LayoutProps) {
	const data = await axios({
		method: "get",
		url: "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error("Error retrieving data:", error);
			throw new Error("Could not get data");
		});

	return (
		<main className="min-h-[190px]  bg-pink-600 relative  text-white">
			<section className=" flex flex-col  w-2/3 absolute min-h-screen  top-0 left-[50%] -translate-x-[50%]   border-gray-600 ">
				<Header />
				<PetContextProvider  data={data}>
					<article> {children}</article>
				</PetContextProvider>
				<Footer />
			</section>
		</main>
	);
}

export default Layout;
