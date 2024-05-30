"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { FormSchema, IndivdiualPetId } from "@/lib/validation";
import { auth, signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

// user actions ->

export async function login(userData: FormData) {
	await signIn("credentials", userData);
	redirect("/app/dashboard");
}

export async function signout() {
	await signOut({
		redirectTo: "/",
	});
}

export async function SignUp(formData: FormData) {
	//get the hashed password

	const password = await bcrypt.hash(formData.get("password") as string, 10);

	await prisma.user.create({
		data: {
			email: formData.get("email") as string,
			hashedPassword: password,
		},
	});

	//we are signing in once signuped to generate a json web token, so that you are authorized to private routes
	await signIn("credentials", formData);
}

// pet actions--CRUD operations
export async function addPet(pet: unknown) {
	const validatedForm = FormSchema.safeParse(pet);

	if (validatedForm.success) {
		try {
			await prisma.pet.create({
				data: {
					...validatedForm.data,
				},
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
