import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require('bcrypt');

/* Composant charger de faire l'authentification de l'utilisateur
*/

const prisma = new PrismaClient()

type jwt = {
    token: any,
    user: any
    session: any
}
type session = {
    session: any,
    token: any,
    user: any
}


const authOptions:any = {
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
    callbacks: {
        async jwt({token, user, session}: session){
            if(user){
                return{
                    ...token,
                    status: user.status,
                }
            }
            return token;
        },
        async session({session, token, user}: session){
            return {
                ...session,
                user: {
                    status: token.status,
                    email: token.email,
                    name: token.name
                }
            }
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};


export default authOptions;