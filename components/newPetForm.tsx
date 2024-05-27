"use client";

import React from "react";
import { Button } from "./ui/button";
import { addPet, editPet } from "@/app/actions/actions";
import PetformButton from "./petformButton";
import { toast } from "sonner";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@prisma/client";

type NewPetFormProps = {
	actionType: "edit" | "add";
	selectedPet: Pet;
	closeDialog: () => void;
};

function NewPetForm({ actionType, selectedPet, closeDialog }: NewPetFormProps) {
	// const { handleAddPet, handleEditPet } = usePetContext();
	return (
		<form
			action={async (formData) => {
				closeDialog();
				try {
					if (actionType === "edit") {
						console.log("udpate ran");
						await editPet(formData, selectedPet);
					} else if (actionType === "add") {
						await addPet(formData);
					}
				} catch (error: any) {
					console.log(`catch block is getting executed`);
					toast.warning(`${error.message}`);
					return;
				}
			}}
		>
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
			<PetformButton actionType={actionType} />
		</form>
	);
}

export default NewPetForm;
