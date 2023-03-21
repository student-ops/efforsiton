import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getMaxAge } from "next/dist/server/image-optimizer"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            authorization: {
                params: { scope: "repo" },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account?.access_token
            }
            return token
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            return session
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 14, // 14 days
    },
    adapter: PrismaAdapter(prisma),
}

export default NextAuth(authOptions)
