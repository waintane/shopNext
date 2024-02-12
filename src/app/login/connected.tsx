"use client";

import { signOut } from "next-auth/react";

type user = {
    user:{name?: string | null | undefined,
        email?:string | null | undefined,
        status?:string | null | undefined}
}

export default function Connected({user}:user){

    function deleteSession(){
        console.log("bruh");
        signOut();
    }

    return(
        <div>
            <h2>Bonjour {user?.name} </h2>
            <button onClick={() => deleteSession()}>deconnection</button>
        </div>
    )
}