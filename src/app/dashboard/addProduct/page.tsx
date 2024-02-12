"use client";

import { useSession } from "next-auth/react";
import  { useRouter } from "next/navigation";
import Link from "next/link";
import ProductForm from "./productForm";
import CategorySelection from "./categorySelection";

type user = {
    name?: string | null | undefined,
    email?: string | null | undefined,
    image?: string | null | undefined,
    status?: string | null | undefined,
}

export default function AddProduct(){
    const router = useRouter();
    const { data: session, status } = useSession();
    const user:user = session?.user!;

    if(user){
        if(user.status === "client"){
            router.push("./");
        }
        return(
            <div>
                <h2>publish new products</h2>
                <ProductForm></ProductForm>
            </div>
        )
    }
    else if(!user){
        return(
            <div>
                <h1>you are not connected please go to the login page</h1>
                <Link href="./login">Login page</Link>
            </div>
        )
    }
}