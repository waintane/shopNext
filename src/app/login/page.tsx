'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";

export default function loginPage(){
    const router = useRouter()
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
        router.push("/dashboard");
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <div>
                    <label htmlFor="email">email: </label>
                    <input type="email" name="email" id="email" placeholder="email" required
                    value={data.email}
                    onChange={(e) => {setData({...data, email: e.target.value})}}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="password" required
                    value={data.password}
                    onChange={(e) => {setData({...data, password: e.target.value})}}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}