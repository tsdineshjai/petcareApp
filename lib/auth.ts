import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import prisma from "./db";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

const config = {
	pages: {
		signIn: "/login",
	},
	//this runs for every login scenario
	providers: [
		Credentials({
			async authorize(credentials) {
				const { email, password } = credentials;

				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});
				if (!user) {
					console.log(`No user found withe the provided email`);
					return null;
				}

				//once the user exists in database, next we check up the password match
				const isPasswordMatch = bcrypt.compare(
					password as string,
					user.hashedPassword
				);
				if (!isPasswordMatch) {
					console.log(`passwords doesnt match`);
					return null;
				}
				return user;
			},
		}),
	],
	// this runs on middleware. means it runs for every route request
	callbacks: {
		authorized: ({ auth, request }) => {
			const isLoggedIn = auth?.user;

			const isTryingToAccessAppRoute =
				request.nextUrl.pathname.includes("/app");

			if (!isLoggedIn && isTryingToAccessAppRoute) {
				return false;
			}

			if (isLoggedIn && isTryingToAccessAppRoute) {
				return true;
			}

			if (!isTryingToAccessAppRoute) {
				return true;
			}
		},
	},
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
