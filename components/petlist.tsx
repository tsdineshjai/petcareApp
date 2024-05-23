"use client";

import usePetContext from "@/lib/hooks";
import Image from "next/image";
import React from "react";

function Petlist() {
	const { pets } = usePetContext();

	return (
		<ul className="bg-white/50 border-b border-black/[0.08] text-stone-950 rounded-lg">
			{pets.map((pet) => {
				return (
					<li key={pet.id}>
						<button className="flex  items-center gap-3 h-[70px] w-full cursor-pointer px-3  text-base hover:bg-[#afb8be]/50  focus:bg-[#afb8be]/50  transition">
							<Image
								src={pet.imageUrl}
								height={35}
								width={35}
								alt="pet Image"
								className="w-[35px] h-[35px] rounded-full object-cover"
							/>
							<p className="font-medium text-xs">{pet.name}</p>
						</button>
					</li>
				);
			})}
		</ul>
	);
}

export default Petlist;
