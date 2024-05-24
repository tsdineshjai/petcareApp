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

function PetButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={"icon"}>
					<PlusIcon className="h-6 w-6" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Pet Info</DialogTitle>
				</DialogHeader>
				<NewPetForm />
			</DialogContent>
		</Dialog>
	);
}

export default PetButton;
