"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<section className="flex flex-col gap-3  items-center justify-center">
			<h2 className="text-red-600 font-light font-mono pt-[2rem]">
				{error?.message}
			</h2>
			<button
				className="p-2 font-normal font-sans border-2 mt-[1rem] px-[3] py-[2] rounded-md bg-stone-900 text-red-400 hover:bg-stone-800 hover:text-red-300"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</section>
	);
}
