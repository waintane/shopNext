
import NextAuth from "next-auth/next";
import authOptions from "@/lib/components/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}