"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { FormSchema, IndivdiualPetId } from "@/lib/validation";
import { auth, signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { checkAuth } from "@/lib/server-utils";

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
	/* checking if the user is logged in */
	const session = await checkAuth();

	const validatedForm = FormSchema.safeParse(pet);

	if (validatedForm.success) {
		try {
			// await prisma.pet.create({
			// 	data: {
			// 		userId: session.user.id,
			// 		...validatedForm.data,
			// 	},
			// });

			// you can do like this in the below way also

			await prisma.pet.create({
				data: {
					...validatedForm.data,
					user: {
						connect: {
							id: session.user.id,
						},
					},
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

export async function editPet(selectedId: unknown, formData: unknown) {
	/* if the user is actually logged in */
	const session = await checkAuth();

	/* validation of the schema */
	const validatedForm = FormSchema.safeParse(formData);
	if (!validatedForm.success) {
		console.log(validatedForm.error);
	}
	const validatedId = IndivdiualPetId.safeParse(selectedId);

	/* checking the existence of the pet that is going to be updated */
	const pet = await prisma.pet.findUnique({
		where: {
			id: validatedId.data,
		},
	});

	if (!pet) {
		return {
			message: "pet not found",
		};
	}

	/* checking the match of pet.userId and sesson.userId, 
	to know if the user has the pet in his list  */
	const DoesTheUserOwnsThePet = pet.userId === session.user.id;

	if (!DoesTheUserOwnsThePet) {
		return {
			message: "user is not authorized to make the changes",
		};
	}

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

//before deleting, we need to make valdation and authentication checks
/* 
checks include below
1. If the user is logged in
2. If the pet that is going to be deleted actually exists
3. If the petId and the session user.id matches, to check if the user is going to delete a pet of its own

*/
export async function deletePet(petId: unknown) {
	/* if the user is logged In */
	const session = await checkAuth();

	/* validation of the schema */
	const validatedId = IndivdiualPetId.safeParse(petId);

	/* checking the existence of the pet that is going to be deleted */
	const pet = await prisma.pet.findUnique({
		where: {
			id: validatedId.data,
		},
	});

	if (!pet) {
		return {
			message: "pet not found",
		};
	}

	/* checking the match of pet.userId and sesson.userId, 
	to know if the user has the pet in his list  */
	const DoesTheUserOwnsThePet = pet.userId === session.user.id;

	if (!DoesTheUserOwnsThePet) {
		return {
			message: "user is not authorized to make the changes",
		};
	}

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
