import React from "react";

function ContentBlock({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-[#dcdee2] shadow-sm rounded-md w-full h-full overflow-hidden relative">
			{children}
		</div>
	);
}

export default ContentBlock;
