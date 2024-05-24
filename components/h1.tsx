import { cn } from "@/lib/utils";

type H1Props = {
	children: React.ReactNode;
	className?: string;
};

function H1({ children, className }: H1Props) {
	return <h1 className={cn(`text-lg leading-3`, className)}>{children}</h1>;
}

export default H1;
