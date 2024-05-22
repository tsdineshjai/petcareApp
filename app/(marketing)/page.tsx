import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen bg-pink-900 flex-col md:flex-row p-[2rem]  text-white flex justify-center items-center gap-[2rem]">
			<Image
				src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
				alt="Preview of PetSoft"
				width={350}
				height={300}
			/>
			<section className="flex flex-col gap-[0.75rem] w-[300px]  items-start justify-center">
				<div>
					<Logo />
				</div>
				<p className="font-medium text-lg">
					Manage your <strong>Pet Day Care</strong> with ease
				</p>
				<p className="text-[12px] font-normal">
					Use PetSoft to easily keep track of pets under your care. Get lifetime
					access for $299.
				</p>
				<div className="flex  gap-[1rem] space-x-3">
					<Button backGroundColor="bg-stone-950" textColor="text-white">
						<Link href={"/signup"}>Get Started</Link>
					</Button>
					<Button backGroundColor="bg-white" textColor="text-stone-950">
						<Link href={"/login"}>Login</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
