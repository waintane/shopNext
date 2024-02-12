"use client"

import { useSession } from "next-auth/react";


export default function DashBoardPage(){
    const { data: session, status } = useSession();
    console.log(session);
    const user = session?.user;
    return(
        <div>
            <h1>Dashboard Page</h1>
            <p>Hi {user?.name} </p>
        </div>
    )
}