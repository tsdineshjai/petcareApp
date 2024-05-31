import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./server-utils";
import { SignInSchema } from "./validation";

const config = {
	pages: {
		signIn: "/login",
	},
	//this runs for every login scenario
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFormData = SignInSchema.safeParse(credentials);

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
			const isLoggedIn = auth?.user;

			const isTryingToAccessAppRoute =
				request.nextUrl.pathname.includes("/app");

			//not logged in and try to access account and dashboard route, access is denied
			if (!isLoggedIn && isTryingToAccessAppRoute) {
				return false;
			}

			//logged in and trying to access private routes:account and dashboard, access provided
			if (isLoggedIn && isTryingToAccessAppRoute) {
				return true;
			}

			//loggedIn and trying to access login,singup and home page, you are redirected to app/dashboard
			if (isLoggedIn && !isTryingToAccessAppRoute) {
				return Response.redirect(new URL("/app/dashboard", request.url));
			}

			if (!isLoggedIn && !isTryingToAccessAppRoute) {
				return true;
			}
		},

		//this runs only when the user logins , then it generates a jwt, we are attaching id to token object as it deemeed necessary

		jwt: ({ token, user }) => {
			if (user) {
				token.userId = user.id;
			}
			return token;
		},

		session: ({ session, token }) => {
			if (session.user) {
				session.user.id = token.userId as string;
			}
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
