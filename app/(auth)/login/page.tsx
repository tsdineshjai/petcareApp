import AuthForm from "@/components/authform";
import H1 from "@/components/h1";
import Link from "next/link";

import React from "react";

function Login() {
	return (
		<main className=" w-fit flex-col gap-2 p-3 flex justify-center items-center ">
			<H1 className="m-2">Login</H1>
			<AuthForm type={"Login"} />
			<p className=" font-light mt-[1rem]">
				Don&apos;t have an account?
				<Link
					className="font-normal text-blue-600 hover:text-blue-800 transition	  ml-[6px]"
					href={"/signup"}
				>
					Sign Up
				</Link>
			</p>
		</main>
	);
}

export default Login;
