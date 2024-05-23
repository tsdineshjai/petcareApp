"use client";

import { PetType } from "@/lib/types";
import React from "react";

type contextType = {
	pets: PetType[];
	selectedId: string | undefined;
} | null;
export const PetContext = React.createContext<contextType>(null);

function PetContextProvider({
	children,
	data,
}: {
	children: React.ReactNode;
	data: PetType[];
}) {
	const [pets, setPets] = React.useState(data);

	const [selectedId, setSelectedId] = React.useState();

	return (
		<PetContext.Provider
			value={{
				pets,
				selectedId,
			}}
		>
			{children}
		</PetContext.Provider>
	);
}

export default PetContextProvider;
