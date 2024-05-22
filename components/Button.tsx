import React from "react";

type ButtonProps = {
	children: React.ReactNode;
	backGroundColor: string;
	textColor: string;
};

function Button({ children, backGroundColor, textColor }: ButtonProps) {
	return (
		<button
			className={` text-[12px] font-mono rounded-full px-[1rem] py-[5px] ${backGroundColor} ${textColor} hover:bg-opacity-70`}
		>
			{children}
		</button>
	);
}

export default Button;
