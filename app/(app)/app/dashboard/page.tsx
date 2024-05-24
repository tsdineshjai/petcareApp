import PetButton from "@/components/PetButton";
import Branding from "@/components/branding";
import ContentBlock from "@/components/contentBlock";
import PetDetails from "@/components/petdetails";
import Petlist from "@/components/petlist";
import SearchForm from "@/components/searchForm";
import Stats from "@/components/stats";

async function Dashboard() {
	return (
		<main>
			<div className="flex items-center justify-between py-[0.71rem]">
				<Branding />
				<Stats />
			</div>
			<div className="grid grid-rows-[45px_275px_375px]  md:grid-cols-3 md:grid-rows-[45px_1fr] md:h-[375px] gap-2 mt-[1rem]">
				<div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
					<SearchForm />
				</div>
				<div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
					<ContentBlock className="relative">
						<Petlist />
						<div className="absolute bottom-4 right-4">
							<PetButton />
						</div>
					</ContentBlock>
				</div>
				<div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
					<ContentBlock>
						<PetDetails />
					</ContentBlock>
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
