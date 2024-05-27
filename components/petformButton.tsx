import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

function PetformButton({ actionType }: { actionType: string }) {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending} className="float-right mt-[7px]">
			{actionType === "add" ? "Add Pet" : "Save"}
		</Button>
	);
}

export default PetformButton;
