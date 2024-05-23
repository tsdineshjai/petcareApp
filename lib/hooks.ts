import { PetContext } from "@/contexts/petListProvider";
import React from "react";

export default function usePetContext() {
	const context = React.useContext(PetContext);

	if (!context) {
		throw new Error("usePetList must be used within the PetContext Provider");
	}
	return context;
}
