"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Login from "./login";
import Connected from "./connected";


type user = {
    name?: string | null | undefined,
    email?: string | null | undefined,
    image?: string | null | undefined,
    status?: string | null | undefined,
}

export default function loginPage(){
    const { data: session, status} = useSession();
    const user:user = session?.user!;
    
    if(!user){
        return(
            <Login></Login>
        );
    }
    if(user){
        return(
            <Connected user={user} ></Connected>
        )
    }
}