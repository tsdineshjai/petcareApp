import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

//clsx helps to write conditional classes
//twMerge helps to merge whenm there is a clash of two similar classes, helps to give [precenedenc to the latter]
