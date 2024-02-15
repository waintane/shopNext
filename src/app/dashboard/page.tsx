"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import  { redirect } from "next/navigation";
import Link from "next/link";
import HeaderDashboard from "./headerDashboard";
import DashboardContent from "./dashboardContent";
import styles from "../../style/components/dashboard.module.scss";

type user = {
    name?: string | null | undefined,
    email?: string | null | undefined,
    image?: string | null | undefined,
    status?: string | null | undefined,
}

export default async function DashBoardPage(){

    const session:any = await getServerSession(authOptions);
    const user = await session?.user;

    if(user?.status != "admin"){
        redirect("./");
    }

    return(
        <div className={styles.dashboard}>
            <HeaderDashboard></HeaderDashboard>
            <DashboardContent user={user}></DashboardContent>
        </div>
    )
}