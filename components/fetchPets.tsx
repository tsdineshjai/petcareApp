"use server";

import axios from "axios";

async function usePetList() {
	const data = await axios({
		method: "get",
		url: "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error("Error retrieving data:", error);
			throw new Error("Could not get data");
		});

	return data;
}

export default usePetList;
