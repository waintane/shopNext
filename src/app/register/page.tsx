'use client'

import { useState } from "react"
import  { useRouter } from "next/navigation"

export default function RegisterPage(){
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const registerUser = async (e:any) => {
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
        <div>
            <h1>Register an account</h1>
            <form onSubmit={registerUser}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" placeholder="username" required
                    value={data.name}
                    onChange={(e) => {setData({...data, name: e.target.value})}}
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
        </div>
    )
}