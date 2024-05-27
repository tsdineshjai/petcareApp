"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { delay } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { PetEssentials } from "@/lib/types";

export async function addPet(formData: any) {
	try {
		//artificial delay
		await delay(500);
		await prisma.pet.create({
			data: {
				name: formData.get("name"),
				ownerName: formData.get("ownerName"),
				age: parseInt(formData.get("age")),
				imageUrl:
					formData.get("imageUrl") ||
					"https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
				notes: formData.get("notes"),
			},
		});
		revalidatePath("/app", "layout");
	} catch (error: any) {
		return {
			message: "Could not add pet.",
		};
	}
}

export async function editPet(formData: any, selectedId: Pet) {
	try {
		await delay(500);
		await prisma.pet.update({
			where: {
				id: selectedId?.id,
			},
			data: {
				name: formData.get("name"),
				ownerName: formData.get("ownerName"),
				age: parseInt(formData.get("age")),
				imageUrl:
					formData.get("imageUrl") ||
					"https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
				notes: formData.get("notes"),
			},
		});
		revalidatePath("/app", "layout");
	} catch (error: any) {
		return {
			message: "Could not edit pet.",
		};
	}
}

export async function deletePet(petId: string) {
	try {
		await delay(2000);
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
