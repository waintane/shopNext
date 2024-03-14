"use server";

import  { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/components/authOptions";
import Link from "next/link";
import HeaderDashboard from "../headerDashboard";
import styles from "../../../style/components/dashboard.module.scss";
import FormAddProduct from "./formAddProduct";
import DashboardEntete from "@/lib/components/dashboardEntete";

/* composant de page pour la page addproduct dans le dashboard, elle vérifie que le user est belle et bien
admin et ensuite elle appelle le form add product.

Composant côté serveur
*/

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
        <div className={styles.dashboardPage}>
            <HeaderDashboard></HeaderDashboard>
            <FormAddProduct user={user} categories={categories}></FormAddProduct>
        </div>
    )
}