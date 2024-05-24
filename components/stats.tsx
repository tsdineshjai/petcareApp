"use client";

import { usePetContext } from "@/lib/hooks";

function Stats() {
	const { petsCount } = usePetContext();
	return (
		<section className="leading-4 grid place-items-center mt-[7px]">
			<p className="text-[1rem] text-center ">{petsCount}</p>
			<small className="text-[10px] mt-[1px] ">current guests</small>
		</section>
	);
}

export default Stats;
