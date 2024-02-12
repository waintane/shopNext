import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()



export const authOptions:any = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials:any,req){
                if(!credentials.email || !credentials?.password){
                    return null;
                }
                const user= await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if(!user){
                    return null;
                }
                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
                if(!passwordsMatch){
                    return null;
                }
                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}