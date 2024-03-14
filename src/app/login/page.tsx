"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Login from "./login";
import Connected from "./connected";

/* Composant page de login, il verifie sur l'utilisateur est connecté, si oui il affiche la page de 
deconnexion si non il affiche la page de login

Composant côté client
 */

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