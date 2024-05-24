"use client";
import { usePetSearch } from "@/lib/hooks";
import React from "react";

function SearchForm() {
	const { search, handleSearch } = usePetSearch();
	return (
		<form className=" w-full h-full  ">
			<input
				className="w-full h-full bg-white/50 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
				placeholder="Search pets"
				value={search}
				onChange={(e) => handleSearch(e.target.value)}
				type="search"
			/>
		</form>
	);
}

export default SearchForm;
