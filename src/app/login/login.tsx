"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import styles from "../../style/components/registerPage.module.scss";

/* Composant login permettant à l'utilisateur de se connecté à son compte à l'aide de la fonction SignIn
de NextAuth

Composant côté client
*/

export default function Login(){
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const loginUser = async (e:any) =>{
        e.preventDefault();
        signIn("credentials", {
            ...data,
            redirect: false,
        });
        router.push("./dashboard");
    }
    return(
        <div className={styles.registerPage}>
            <form onSubmit={loginUser}>
                <h1>Connexion</h1>
                <div>
                    <input type="email" name="email" id="email" placeholder="email" required
                    value={data.email}
                    onChange={(e) => {setData({...data, email: e.target.value})}}
                    />
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="password" required
                    value={data.password}
                    onChange={(e) => {setData({...data, password: e.target.value})}}
                    />
                </div>
                <button type="submit">Connection</button>

                <p>Cliquez <Link href={"./register"}>ici</Link> pour vous créer un compte</p>
            </form>
        </div>
    )
}