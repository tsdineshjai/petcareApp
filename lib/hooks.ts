import { PetContext } from "@/contexts/petListProvider";
import PetSearchContextProvider, {
	PetSearchCtxt,
} from "@/contexts/petSearchProvider";
import React, { useContext } from "react";

export function usePetContext() {
	const context = React.useContext(PetContext);

	if (!context) {
		throw new Error("usePetList must be used within the PetContext Provider");
	}
	return context;
}

export function usePetSearch() {
	const context = useContext(PetSearchCtxt);

	if (!context) {
		throw new Error(
			"usePetSearch must be used within the petSearchContext provider"
		);
	}
	return context;
}
