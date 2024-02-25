"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import  { redirect } from "next/navigation";
import Link from "next/link";
import HeaderDashboard from "./headerDashboard";
import DashboardContent from "./dashboardContent";
import styles from "../../style/components/dashboard.module.scss";

interface searchProps {
    searchParams : {query:string}
}

export default async function DashBoardPage({searchParams: {query}}:searchProps){

    const session:any = await getServerSession(authOptions);
    const user = await session?.user;

    if(user?.status != "admin"){
        redirect("./");
    }

    return(
        <div className={styles.dashboardPage}>
            <HeaderDashboard></HeaderDashboard>
            <DashboardContent user={user} query={query}></DashboardContent>
        </div>
    )
}