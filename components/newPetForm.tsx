"use client";

import { PetType } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";

// export interface PetType {
// 	id: string;
// 	name: string;
// 	ownerName: string;
// 	imageUrl: string;
// 	age: number;
// 	notes: string;
// }

function NewPetForm() {
	const [pet, setPet] = React.useState<PetType>({
		id: "",
		name: "",
		ownerName: "",
		imageUrl: "",
		age: 0,
		notes: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPet({
			...pet,
			[e.target.name]: e.target.value,
		});
	};
	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPet({
			...pet,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(pet);
	};
	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label htmlFor="name">Name</label>
			</p>
			<input
				type="text"
				name="name"
				id="name"
				value={pet?.name}
				className="border py-2 px-2 w-full rounded-md my-[0.5rem]"
				onChange={handleChange}
			/>
			<p>
				<label htmlFor="ownerName">ownerName</label>
			</p>
			<input
				type="text"
				name="ownerName"
				id="ownerName"
				value={pet?.ownerName}
				className="border py-2 px-2 w-full rounded-md my-[0.5rem]"
				onChange={handleChange}
			/>
			<p>
				<label htmlFor="imageUrl">Image</label>
			</p>
			<input
				type="text"
				name="imageUrl"
				id="imageUrl"
				value={pet?.imageUrl}
				className="border py-2 px-2 w-full rounded-md my-[0.5rem]"
				onChange={handleChange}
			/>
			<p>
				<label htmlFor="age">Age</label>
			</p>
			<input
				type="text"
				name="age"
				id="age"
				value={pet?.age}
				className="border py-2 px-2 w-full rounded-md my-[0.5rem]"
				onChange={handleChange}
			/>
			<p>
				<label htmlFor="notes">Notes</label>
			</p>
			<textarea
				name="notes"
				id="notes"
				className="border py-2 px-2 w-full rounded-md my-[0.5rem]"
				rows={4}
				cols={50}
				value={pet?.notes}
				onChange={handleTextAreaChange}
			/>
			<Button type="submit" className="float-right mt-[7px]">
				Add Pet
			</Button>
		</form>
	);
}

export default NewPetForm;
