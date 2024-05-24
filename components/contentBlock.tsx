import { cn } from "@/lib/utils";
import React from "react";

type ContentBlockProps = {
	children: React.ReactNode;
	className?: string;
};

function ContentBlock({ children, className }: ContentBlockProps) {
	return (
		<div
			className={cn(
				`bg-[#dcdee2] shadow-sm rounded-md w-full h-full overflow-hidden relative`,
				className
			)}
		>
			{children}
		</div>
	);
}

export default ContentBlock;
