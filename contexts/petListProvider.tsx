"use client";

import { createPet } from "@/app/actions/actions";
import { PetType } from "@/lib/types";
import React from "react";

type contextType = {
	pets: PetType[];
	selectedId: PetType["id"] | null;
	handleChangeSelectedId: (id: string) => void;
	selectedPet: PetType | undefined;
	petsCount: number;
	petRemoverFromPetlist: (id: string) => void;
	handlePets: (newPet: Omit<PetType, "id">) => void;
	handlePetEdit: (petId: string, newPet: Omit<PetType, "id">) => void;
};

//context
export const PetContext = React.createContext<contextType | null>(null);

function PetContextProvider({
	children,
	data: pets,
}: {
	children: React.ReactNode;
	data: PetType[];
}) {
	const [selectedId, setSelectedId] = React.useState<string | null>(null);

	const selectedPet = pets.find((pet) => pet.id === selectedId);

	const handleChangeSelectedId = (id: string) => setSelectedId(id);

	const petsCount = pets?.length;

	const petRemoverFromPetlist = (id: string) => {
		setPets((prevState) => prevState.filter((pet) => pet.id !== id));
		setSelectedId(null);
	};

	const handlePets = async (newPet: Omit<PetType, "id">) => {
		await createPet(newPet);
	};

	const handlePetEdit = (petId: string, newPet: Omit<PetType, "id">) => {
		const updatedPets = pets.map((pet) => {
			if (pet.id === petId) {
				return {
					...pet,
					...newPet,
				};
			} else {
				return pet;
			}
		});
		setPets([...updatedPets]);
	};

	return (
		<PetContext.Provider
			value={{
				pets,
				selectedId,
				handleChangeSelectedId,
				selectedPet,
				petsCount,
				petRemoverFromPetlist,
				handlePets,
				handlePetEdit,
			}}
		>
			{children}
		</PetContext.Provider>
	);
}

export default PetContextProvider;
