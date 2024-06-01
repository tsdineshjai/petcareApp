import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petFormSchema = z
	.object({
		name: z.string().trim().min(1, { message: "Name is required" }).max(100),
		ownerName: z
			.string()
			.trim()
			.min(1, { message: "Owner name is required" })
			.max(100),
		imageUrl: z.union([
			z.literal(""),
			z.string().trim().url({ message: "Image url must be a valid url" }),
		]),
		age: z.coerce.number().int().positive().max(50),
		notes: z.union([z.literal(""), z.string().trim().max(1000)]),
	})
	.transform((petData) => {
		return {
			...petData,
			imageUrl: petData?.imageUrl || DEFAULT_PET_IMAGE,
		};
	});

export const IndivdiualPetId = z.string().cuid();

export const authSchema = z.object({
	email: z.string().email().min(5, { message: "write a valid email" }),
	password: z.string().min(6, { message: "minimum six characters in length" }),
});

export type TPetForm = z.infer<typeof petFormSchema>;
export type TAuth = z.infer<typeof authSchema>;
export const petIdSchema = z.string().cuid();
