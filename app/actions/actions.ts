"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { Pet } from "@prisma/client";
import { PetEssentials } from "@/lib/types";
import { FormSchema } from "@/lib/validation";

export async function addPet(formData: PetEssentials) {
	const { success, data } = FormSchema.safeParse(formData);

	if (success) {
		try {
			await prisma.pet.create({
				data: data,
			});
			revalidatePath("/app", "layout");
		} catch (error: any) {
			console.log(error);
			return {
				message: "Could not add pet.",
			};
		}
	} else {
		console.log("schema is invalid");
	}
}

export async function editPet(formData: PetEssentials, selectedId: Pet) {
	const { success, data } = FormSchema.safeParse(formData);

	// if validation is success go into the if block
	if (success) {
		try {
			await prisma.pet.update({
				where: {
					id: selectedId?.id,
				},
				data: data,
			});
			revalidatePath("/app", "layout");
		} catch (error: any) {
			return {
				message: "Could not edit pet.",
			};
		}
	} else {
		console.log("schema is invalid");
	}
}

export async function deletePet(petId: string) {
	try {
		await prisma.pet.delete({
			where: {
				id: petId,
			},
		});
		revalidatePath("/app", "layout");
	} catch (error) {
		return {
			message: "Could not delete pet.",
		};
	}
}
