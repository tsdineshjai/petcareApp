"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { PetType } from "@/lib/types";

export async function createPet(pet: Omit<PetType, "id">) {
	await prisma.pet.create({
		data: pet,
	});
	revalidatePath("/app", "layout");
}
