import React from "react";

function SearchForm() {
	return (
		<form className=" w-full h-full ">
			<input
				type="text"
				name="search"
				id="searchPet"
				className="h-full w-full bg-pink-700 rounded-lg px-[1rem] font-xs focus:outline-none "
			/>
		</form>
	);
}

export default SearchForm;
