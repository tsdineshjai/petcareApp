"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { FormSchema, IndivdiualPetId, SignInSchema } from "@/lib/validation";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcrypt";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { delay } from "@/lib/utils";
import { AuthError } from "next-auth";

// user actions ->

export async function logIn(prevState: unknown, formData: unknown) {
	await delay(1000);
	if (!(formData instanceof FormData)) {
		return {
			message: "Invalid form data.",
		};
	}
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return {
						message: "Invalid credentials.",
					};
				}
				default: {
					return {
						message: "Error. Could not sign in.",
					};
				}
			}
		}

		throw error; // nextjs redirects throws error, so we need to rethrow it
	}
}

export async function signout() {
	await delay(1500);
	await signOut({
		redirectTo: "/",
	});
}

export async function signUp(prevState: unknown, formData: unknown) {
	await delay(1000);

	// check if formData is a FormData type
	if (!(formData instanceof FormData)) {
		return {
			message: "Invalid form data.",
		};
	}

	// convert formData to a plain object
	const formDataEntries = Object.fromEntries(formData.entries());

	// validation
	const validatedFormData = SignInSchema.safeParse(formDataEntries);
	if (!validatedFormData.success) {
		return {
			message: "Invalid form data.",
		};
	}

	const { email, password } = validatedFormData.data;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		await prisma.user.create({
			data: {
				email,
				hashedPassword,
			},
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return {
					message: "Email already exists.",
				};
			}
		}

		return {
			message: "Could not create user.",
		};
	}

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
	const validatedId = IndivdiualPetId.safeParse(selectedId);

	if (!validatedId.success || !validatedForm.success) {
		return {
			message: "Invalid pet data.",
		};
	}

	/* checking the existence of the pet that is going to be updated */
	const pet = await getPetById(validatedId.data);

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

	if (!validatedId.success) {
		return {
			message: "Invalid pet data.",
		};
	}

	/* checking the existence of the pet that is going to be deleted */
	const pet = await getPetById(validatedId.data);

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
