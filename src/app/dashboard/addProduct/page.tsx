"use server"

import  { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import HeaderDashboard from "../headerDashboard";
import styles from "../../../style/components/dashboard.module.scss";
import FormAddProduct from "./formAddProduct";

export default async function AddProduct(){
    const session:any = await getServerSession(authOptions);
    const user = session?.user;
    if(user?.status != "admin"){
        redirect("./");
    }
    const categories = await prisma.categories.findMany({
        orderBy: {id: "desc"}
    });
    return(
        <div className={styles.dashboard}>
            <HeaderDashboard></HeaderDashboard>
            <FormAddProduct categories={categories}></FormAddProduct>
        </div>
    )
}