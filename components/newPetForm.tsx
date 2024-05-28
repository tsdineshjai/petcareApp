"use client";

import React from "react";
import { addPet, editPet } from "@/app/actions/actions";
import PetformButton from "./petformButton";
import { toast } from "sonner";
import { Pet } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { FormSchema } from "@/lib/validation";

type NewPetFormProps = {
	actionType: "edit" | "add";
	selectedPet: Pet;
	closeDialog: () => void;
};

function NewPetForm({ actionType, selectedPet, closeDialog }: NewPetFormProps) {
	const {
		register,
		trigger,
		getValues,
		formState: { errors },
	} = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});
	return (
		<form
			action={async (formData) => {
				const result = await trigger();
				if (!result) {
					return;
				}

				const petData = getValues();
				petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

				if (actionType === "edit") {
					const error = await editPet(petData, selectedPet);
					if (error) {
						toast.warning(`${error.message}`);
					}
				} else if (actionType === "add") {
					const error = await addPet(petData);
					if (error) {
						toast.warning(`${error.message}`);
					}
				}
				closeDialog();
			}}
		>
			<p>
				<label className="text-xs" htmlFor="name">
					Name
				</label>
			</p>
			<input
				type="text"
				id="name"
				{...register("name")}
				className="border py-1 mb-1 px-1 w-full rounded-md mt-[0.25rem]"
			/>
			{errors.name && (
				<p className="text-[10px] text-red-600">{errors.name.message}</p>
			)}
			<p>
				<label className="text-xs" htmlFor="ownerName">
					Owner Name
				</label>
			</p>
			<input
				type="text"
				id="ownerName"
				{...register("ownerName")}
				className="border py-1 mb-[11px] px-1 w-full rounded-md mt-[0.25rem]"
			/>
			{errors.ownerName && (
				<p className="text-[10px] text-red-600">{errors.ownerName.message}</p>
			)}
			<p>
				<label className="text-xs" htmlFor="imageUrl">
					Image
				</label>
			</p>
			<input
				type="text"
				id="imageUrl"
				{...register("imageUrl")}
				className="border py-1 mb-[11px] px-1 w-full rounded-md mt-[0.25rem]"
			/>
			{errors.imageUrl && (
				<p className="text-[10px] text-red-600">{errors.imageUrl.message}</p>
			)}
			<p>
				<label className="text-xs" htmlFor="age">
					Age
				</label>
			</p>
			<input
				type="number"
				id="age"
				className="border py-1 mb-[11px] px-1 w-full rounded-md mt-[0.25rem]"
				{...register("age")}
			/>
			{errors.age && (
				<p className="text-[10px] text-red-600">{errors.age.message}</p>
			)}
			<p>
				<label className="text-xs" htmlFor="notes">
					Notes
				</label>
			</p>
			<textarea
				id="notes"
				className="border py-1 mb-[11px] px-1 w-full rounded-md mt-[0.25rem]"
				rows={4}
				cols={50}
				{...register("notes")}
			/>
			{errors.notes && (
				<p className="text-[10px] text-red-600">{errors.notes.message}</p>
			)}
			<PetformButton actionType={actionType} />
		</form>
	);
}

export default NewPetForm;
