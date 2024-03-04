import { prisma } from "@/lib/db/prisma";
import styles from "../../style/components/dashboardContent.module.scss";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import DashboardEntete from "@/lib/components/dashboardEntete";

type user = {
    user:{name?: string | null | undefined,
        email?:string | null | undefined,
        status?:string | null | undefined},
    query : string
}

export async function searchUser(formData:FormData){
    "use server"

    let query = formData.get("search")?.toString();
    if(!query){
        query = "";
    }
    redirect("./dashboard?query=" + `${query}`)
}

export default async function DashboardContent({user,query}:user){

    const numberUser = await prisma.user.count({
       select : {_all:true} 
    })

    let users:User[];
    
    if(query){
        users = await prisma.user.findMany({
            where: {
                OR: [
                    {name: {contains: query.toLowerCase()}},
                    {email: {contains: query.toLowerCase()}},
                    {status: {contains: query}}
                ]
            },
        })
    }else{
        users = await prisma.user.findMany({
            orderBy : {id : "desc"}
        })
    }

    if(users.length < 1){
        users = await prisma.user.findMany({
            orderBy : {id : "desc"}
        })
    }


    return(
        <div className={styles.content}>
            <DashboardEntete user={user}>TABLEAU DE BORD</DashboardEntete>
            <div className={styles.boxInfo}>
                <div className={styles.box}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <p> {numberUser?._all} </p>
                    <p>Utilisateurs</p>
                </div>
            </div>
            <div className={styles.tableau}>
                <form action={searchUser}>
                    <div className={styles.tabRow}>
                        <h4>Utilisateurs</h4>
                        <h4 className={styles.email}>Courriels</h4>
                        <div className={styles.status}>
                            <h4>statut</h4>
                            <input type="search" placeholder="rechercher" name="search"/>
                            <button type="submit" style={{display:"none"}}></button>
                        </div>
                    </div>
                </form>

                {users.map( e => (
                    <form action="" className={styles.tabRow}>
                        <p> {e.name} </p>
                        <p className={styles.email}> {e.email} </p>
                        <div className={styles.status}>
                            <p> {e.status} </p>
                            <button type="submit"> modifier </button>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    )
}