"use client";

import { signOut } from "next-auth/react";
import styles from "../../style/components/registerPage.module.scss";

/* Composant Connected permettant la deconnexion de l'utilisateur via la fonction signOut de NextAuth 

Composant côté client
*/

type user = {
    user:{name?: string | null | undefined,
        email?:string | null | undefined,
        status?:string | null | undefined}
}

export default function Connected({user}:user){

    function deleteSession(){
        signOut();
    }

    return(
        <div className={styles.registerPage}>
            <form action={() => deleteSession()}>
                <h1>Bonjour {user?.name} </h1>
                <button type="submit">deconnexion</button>
            </form>
        </div>
    )
}