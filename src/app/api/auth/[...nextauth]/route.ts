import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import Google from "next-auth/providers/google";
import {
    getUserByEmail,
    updateUserByEmail,
} from "@/repositories/user";
import { JWT } from "next-auth/jwt";
import { users } from "@prisma/client";
import { authOptions } from "@/utils/authOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };