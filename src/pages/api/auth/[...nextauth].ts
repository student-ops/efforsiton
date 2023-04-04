import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { InsertProject, ProjectMinimal } from "../../../lib/project"
import dotenv from "dotenv"

dotenv.config()

const prisma = new PrismaClient()
const basePath = process.env.BASE_PATH

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
    // callbacks: {
    //     async jwt({ token, account }) {
    //         if (account) {
    //             token.accessToken = account?.access_token
    //         }
    //         return token
    //     },
    //     async session({ session, token }) {
    //         session.user.accessToken = token.accessToken
    //         return session
    //     },
    // },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 14, // 14 days
    },
    pages: {
        signIn: `/efforsition/api/auth/signin`,
        signOut: `/efforsition/api/auth/signout`,
        error: `/efforsition/api/auth/error`,
        verifyRequest: `/efforsition/api/auth/verify-request`,
    },
    events: {
        signIn: async (message) => {
            if (message.isNewUser) {
                const project: ProjectMinimal = {
                    userName: message.user.name!,
                    name: "Getting Started",
                    description:
                        "Thank you for joining our service!\nLet's begin this journey together!",
                }
                const res = await InsertProject(project)
                if (!res) {
                    console.log("Error: Getting Started project can't created")
                    return
                } else {
                    const ins = await prisma.playground.create({
                        data: {
                            projectid: res.id,
                            belongs: message.user.id,
                        },
                    })
                    console.log(ins)
                }
            }
            return
        },
    },

    adapter: PrismaAdapter(prisma),
}

export default NextAuth(authOptions)
