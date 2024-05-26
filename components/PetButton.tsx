"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import NewPetForm from "./newPetForm";
import { usePetContext } from "@/lib/hooks";
import { PetType } from "@/lib/types";

function PetButton() {
	const [isFormOpen, setIsFormOpen] = React.useState(false);
	const { selectedPet } = usePetContext();

	console.log("form open is ", isFormOpen);

	return (
		<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
			<DialogTrigger asChild>
				<Button size={"icon"}>
					<PlusIcon className="h-6 w-6" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Pet Info</DialogTitle>
				</DialogHeader>
				<NewPetForm
					actionType={"add"}
					closeDialog={() => setIsFormOpen(false)}
					selectedPet={selectedPet as PetType}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default PetButton;
