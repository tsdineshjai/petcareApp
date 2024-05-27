"use client";

import { addPet, deletePet, editPet } from "@/app/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import React, { useOptimistic } from "react";
import { toast } from "sonner";

type contextType = {
	optimisticPets: Pet[];
	selectedId: Pet["id"] | null;
	selectedPet: Pet | undefined;
	petsCount: number;
	handleChangeSelectedId: (id: string) => void;
	handleCheckoutPet: (id: string) => Promise<void>;
	handleAddPet: (newPet: PetEssentials) => Promise<void>;
	handleEditPet: (petId: string, newPet: Pet) => Promise<void>;
};

//context
export const PetContext = React.createContext<contextType | null>(null);

function PetContextProvider({
	children,
	data,
}: {
	children: React.ReactNode;
	data: Pet[];
}) {
	const [optimisticPets, setOptimisticPets] = useOptimistic(
		data,
		//updaterfn
		(state, { action, payload }) => {
			switch (action) {
				case "add":
					return [...state, { ...payload, id: Math.random().toString() }];
				case "edit":
					return state.map((pet) => {
						if (pet.id === payload.id) {
							return { ...pet, ...payload.newPetData };
						}
						return pet;
					});
				case "delete":
					return state.filter((pet) => pet.id !== payload);
				default:
					return state;
			}
		}
	);

	const [selectedId, setSelectedId] = React.useState<string | null>(null);

	const selectedPet = optimisticPets.find((pet) => pet.id === selectedId);
	const handleChangeSelectedId = (id: string) => setSelectedId(id);
	const petsCount = optimisticPets?.length;

	// event handlers --> actions
	const handleAddPet = async (newPet: PetEssentials) => {
		setOptimisticPets({ action: "add", payload: newPet });
		const error = await addPet(newPet);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};
	const handleEditPet = async (petId: Pet["id"], newPetData: Pet) => {
		setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } });
		const error = await editPet(petId, newPetData);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleCheckoutPet = async (petId: Pet["id"]) => {
		setOptimisticPets({ action: "delete", payload: petId });
		const error = await deletePet(petId);
		if (error) {
			toast.warning(error.message);
			return;
		}
		setSelectedId(null);
	};

	return (
		<PetContext.Provider
			value={{
				optimisticPets,
				selectedId,
				handleChangeSelectedId,
				selectedPet,
				petsCount,
				handleCheckoutPet,
				handleEditPet,
				handleAddPet,
			}}
		>
			{children}
		</PetContext.Provider>
	);
}

export default PetContextProvider;
