"use client";

import { usePetContext } from "@/lib/hooks";
import { PetType } from "@/lib/types";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import NewPetForm from "./newPetForm";
import React from "react";

const buttonclassName = ` text-[11px] text-white/95 font-normal rounded-full px-[1rem] py-[3px] hover:bg-opacity-70 border bg-[#db2777] border-none`;

function PetDetails() {
	const { selectedPet, petRemoverFromPetlist } = usePetContext();
	const [isFormOpen, setIsFormOpen] = React.useState(false);

	return (
		<main className=" flex flex-col bg-[#dcdee2]/50 h-full w-full   text-stone-950 rounded-lg ">
			{!selectedPet ? (
				<NoView />
			) : (
				<>
					<section className="flex flex-row justify-between px-5 py-3 items-center bg-white border border-light">
						<div className="flex flex-row gap-[2rem] place-items-center">
							<Image
								src={selectedPet?.imageUrl}
								height={35}
								width={35}
								alt="pet Image"
								className="w-[35px] h-[35px] rounded-full object-cover"
							/>
							<p className="font-medium text-xs">{selectedPet?.name}</p>
						</div>
						<div className=" flex gap-2">
							{/* dialog component is derived from the shadcn ui  */}
							<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
								<DialogTrigger asChild>
									<button className={buttonclassName}>Edit</button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Edit Pet Info</DialogTitle>
									</DialogHeader>
									<NewPetForm
										actionType={"edit"}
										selectedPet={selectedPet}
										closeDialog={() => setIsFormOpen(false)}
									/>
								</DialogContent>
							</Dialog>
							<button
								className={buttonclassName}
								onClick={() => petRemoverFromPetlist(selectedPet.id)}
							>
								Checkout
							</button>
						</div>
					</section>
					<section className="flex flex-row justify-between items-center px-[4.85rem] py-[1.25rem] ">
						<div className="grid place-items-center">
							<p className="text-[12px] font-medium">Owner Name</p>
							<p className="text-[11px] font-normal">
								{selectedPet?.ownerName}
							</p>
						</div>

						<div className="grid place-items-center">
							<p className="text-[12px] font-medium">Age</p>
							<p className="text-[11px] font-normal"> {selectedPet?.age}</p>
						</div>
					</section>
					<section className="bg-white  w-[91%]  mx-auto rounded-sm flex-1 mb-2  border border-light">
						<p className="font-extralight px-2 py-1 text-[12px] text-center">
							{selectedPet?.notes}
						</p>
					</section>
				</>
			)}
		</main>
	);
}

export default PetDetails;

function NoView() {
	return (
		<p className="text-xl text-center font-mono my-auto"> No Pet Selected...</p>
	);
}
