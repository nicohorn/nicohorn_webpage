import { getUserByEmail, updateUserByEmail } from "@/repositories/user";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { users } from "@prisma/client";
import { NextAuthOptions, User } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    }),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            console.log("SIGN IN USER", user);
            if (!user || !user.email) return false;
            const userExists = await getUserByEmail(user.email!);
            console.log("USER EXISTS", userExists)
            if (userExists) {
                //This is just to update the user last login datetime.
                await updateUserByEmail(user.email, {
                    ...userExists,
                    last_login: new Date(),
                });
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await getUserByEmail(user.email!);
                //Adding more useful data to the token (role and id)
                token.user = dbUser as users

            }


            return token;
        },
        async session({ session, token }) {
            //Using the data I put in the token to modify the session user object. This way I can access that data from anywhere on the app.
            session.user = token.user as User

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    //debug: process.env.NODE_ENV === "development",
};