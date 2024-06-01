import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validation";
import prisma from "./db";

const config = {
	pages: {
		signIn: "/login",
	},
	//this runs for every login scenario
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFormData = authSchema.safeParse(credentials);

				if (!validatedFormData.success) {
					return null;
				}

				// extract values
				const { email, password } = validatedFormData.data;

				const user = await getUserByEmail(email);
				if (!user) {
					console.log("No user found");
					return null;
				}

				const passwordsMatch = await bcrypt.compare(
					password,
					user.hashedPassword
				);
				if (!passwordsMatch) {
					console.log("Invalid credentials");
					return null;
				}

				return user;
			},
		}),
	],
	// this runs on middleware. means it runs for every try of  route access
	callbacks: {
		authorized: ({ auth, request }) => {
			// runs on every request with middleware
			const isLoggedIn = Boolean(auth?.user);
			const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

			if (!isLoggedIn && isTryingToAccessApp) {
				return false;
			}

			if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) {
				return Response.redirect(new URL("/payment", request.nextUrl));
			}

			if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
				return true;
			}

			if (
				isLoggedIn &&
				(request.nextUrl.pathname.includes("/login") ||
					request.nextUrl.pathname.includes("/signup")) &&
				auth?.user.hasAccess
			) {
				return Response.redirect(new URL("/app/dashboard", request.nextUrl));
			}

			if (isLoggedIn && !isTryingToAccessApp && !auth?.user.hasAccess) {
				if (
					request.nextUrl.pathname.includes("/login") ||
					request.nextUrl.pathname.includes("/signup")
				) {
					return Response.redirect(new URL("/payment", request.nextUrl));
				}

				return true;
			}

			if (!isLoggedIn && !isTryingToAccessApp) {
				return true;
			}

			return false;
		},

		//this runs only when the user logins , then it generates a jwt, we are attaching id to token object as it deemeed necessary

		jwt: async ({ token, user, trigger }) => {
			if (user) {
				// on sign in
				token.userId = user.id;
				token.email = user.email!;
				token.hasAccess = user.hasAccess;
			}

			//when tupdate is triggered, we are getting the latest  values of the user , especially the hasAccess value.
			if (trigger === "update") {
				// on every request
				const userFromDb = await prisma.user.findUnique({
					where: {
						email: token.email,
					},
				});
				if (userFromDb) {
					token.hasAccess = userFromDb.hasAccess;
				}
			}

			return token;
		},

		session: ({ session, token }) => {
			session.user.id = token.userId as string;
			session.user.hasAccess = token.hasAccess;

			return session;
		},
	},
} satisfies NextAuthConfig;

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(config);
