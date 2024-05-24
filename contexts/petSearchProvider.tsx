"use client";

import React from "react";

type PetSearchTypes = {
	search: string;
	handleSearch: (element: string) => void;
};

export const PetSearchCtxt = React.createContext<PetSearchTypes | null>(null);

function PetSearchContextProvider({ children }: { children: React.ReactNode }) {
	const [search, setSearch] = React.useState("");

	const handleSearch = (value: string) => setSearch(value);

	return (
		<>
			<PetSearchCtxt.Provider
				value={{
					search,
					handleSearch,
				}}
			>
				{children}
			</PetSearchCtxt.Provider>
		</>
	);
}

export default PetSearchContextProvider;
