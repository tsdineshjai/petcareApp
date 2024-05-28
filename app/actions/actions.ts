"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { Pet } from "@prisma/client";
import { PetEssentials } from "@/lib/types";
import { FormSchema, IndivdiualPetId } from "@/lib/validation";

export async function addPet(formData: unknown) {
	const { success, data } = FormSchema.safeParse(formData);

	if (success) {
		try {
			await prisma.pet.create({
				data: data,
			});
			console.log(`successfully added the pet`);
			revalidatePath("/app", "layout");
		} catch (error: any) {
			console.log(error);
			return {
				message: "Could not add pet.",
			};
		}
	} else {
		return {
			message: "Schema is invalid.",
		};
	}
}

export async function editPet(formData: unknown, selectedId: unknown) {
	const validatedForm = FormSchema.safeParse(formData);
	const validatedId = IndivdiualPetId.safeParse(selectedId);

	// if validation is success go into the if block
	if (validatedForm.success && validatedId.success) {
		try {
			await prisma.pet.update({
				where: {
					id: validatedId.data,
				},
				data: validatedForm.data,
			});
			console.log(`successfully udpated the pet`);
			revalidatePath("/app", "layout");
		} catch (error: any) {
			return {
				message: "Could not edit pet.",
			};
		}
	} else {
		return {
			message: "Schema is invalid.",
		};
	}
}

export async function deletePet(petId: unknown) {
	const validatedId = IndivdiualPetId.safeParse(petId);

	if (validatedId.success) {
		try {
			await prisma.pet.delete({
				where: {
					id: validatedId.data,
				},
			});
			console.log(`successfully deleted the pet`);
			revalidatePath("/app", "layout");
		} catch (error) {
			return {
				message: "Could not delete pet.",
			};
		}
	} else {
		return {
			message: "PetId is invalid",
		};
	}
}
