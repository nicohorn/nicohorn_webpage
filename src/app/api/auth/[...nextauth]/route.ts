import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import Google from "next-auth/providers/google";
import {
    getUserByEmail,
    updateUserByEmail,
} from "@/repositories/user";
import { JWT } from "next-auth/jwt";
import { users } from "@prisma/client";
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
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user || !user.email) return false;
            const userExists = await getUserByEmail(user.email!);
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
    debug: process.env.NODE_ENV === "development",
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
