'use client';

import { useState } from "react";
import  { useRouter } from "next/navigation";
import styles from "../../style/components/registerPage.module.scss";
import Link from "next/link";

export default function RegisterPage(){
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })

    const registerUser = async (e:any) => {
        if(data.password != data.passwordConfirm){
            throw Error ("mot de passe non correspondant");
        }
        e.preventDefault()
        const reponse = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data})
        } )

        const userInfo = await reponse.json();
        console.log(userInfo);
        router.push("./login");
    }

    return(
        <div className={styles.registerPage}>

            <form onSubmit={registerUser}>
                <h1>Créer un compte</h1>
                <div>
                    <input type="text" name="username" id="username" placeholder="username" required
                    value={data.name}
                    onChange={(e) => {setData({...data, name: e.target.value})}}
                    />
                </div>
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
                <div>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer password" required
                    value={data.passwordConfirm}
                    onChange={(e) => {setData({...data, passwordConfirm: e.target.value})}}
                    />
                </div>
                <button type="submit">Enregistrer</button>

                <p>Cliquez <Link href={"./login"}>ici</Link> pour vous connecter</p>
            </form>
        </div>
    )
}