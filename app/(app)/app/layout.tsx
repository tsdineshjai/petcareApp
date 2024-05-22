"use client";
import Header from "@/components/app-header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

type LayoutProps = {
	children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
	const pathName = usePathname();

	const value = pathName.split("/")[2];
	return (
		<main className="min-h-[190px]  bg-pink-600 relative text-white">
			<section className=" flex flex-col justify-between  w-1/2 absolute min-h-screen  top-0 left-[50%] -translate-x-[50%]   border-gray-600 ">
				<Header />
				Your {value.charAt(0).toUpperCase() + value.slice(1)}
				<article> {children}</article>
				<Footer />
			</section>
		</main>
	);
}

export default Layout;
