"use client";

import { PetType } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import { usePetContext } from "@/lib/hooks";

type NewPetFormProps = {
	actionType: "edit" | "add";
	selectedPet: PetType;
	closeDialog: () => void;
};

function NewPetForm({ actionType, selectedPet, closeDialog }: NewPetFormProps) {
	const { handlePets, handlePetEdit } = usePetContext();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const petValues = {
			name: formData.get("name") as string,
			ownerName: formData.get("ownerName") as string,
			imageUrl:
				(formData.get("imageUrl") as string) ||
				"https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
			age: +(formData.get("age") as string),
			notes: formData.get("notes") as string,
		};
		if (actionType === "edit") {
			handlePetEdit(selectedPet.id, petValues);
		} else {
			handlePets(petValues);
		}
		closeDialog();
	};
	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label className="text-xs" htmlFor="name">
					Name
				</label>
			</p>
			<input
				type="text"
				name="name"
				id="name"
				className="border py-1 mb-1 px-1 w-full rounded-md mt-[0.25rem]"
				required
				defaultValue={actionType === "edit" ? selectedPet?.name : ""}
			/>
			<p>
				<label className="text-xs" htmlFor="ownerName">
					Owner Name
				</label>
			</p>
			<input
				type="text"
				name="ownerName"
				id="ownerName"
				className="border py-1 mb-[11px] px-1 w-full rounded-md mt-[0.25rem]"
				required
				defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
			/>
			<p>
				<label className="text-xs" htmlFor="imageUrl">
					Image
				</label>
			</p>
			<input
				type="text"
				name="imageUrl"
				id="imageUrl"
				className="border py-1 mb-[11px] px-1 w-full rounded-md mt-[0.25rem]"
				defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
			/>
			<p>
				<label className="text-xs" htmlFor="age">
					Age
				</label>
			</p>
			<input
				type="number"
				name="age"
				id="age"
				className="border py-1 mb-[11px] px-1 w-full rounded-md mt-[0.25rem]"
				required
				defaultValue={actionType === "edit" ? selectedPet?.age : ""}
			/>
			<p>
				<label className="text-xs" htmlFor="notes">
					Notes
				</label>
			</p>
			<textarea
				name="notes"
				id="notes"
				className="border py-1 mb-[11px] px-1 w-full rounded-md mt-[0.25rem]"
				rows={4}
				cols={50}
				required
				defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
			/>
			<Button type="submit" className="float-right mt-[7px]">
				{actionType === "add" ? "Add Pet" : "Save"}
			</Button>
		</form>
	);
}

export default NewPetForm;
