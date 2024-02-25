
import { Product, User } from "@prisma/client";
import ProductPanel from "./productPanel";
import { redirect } from "next/navigation";
import styles from "../../../style/components/allProductContent.module.scss";
import DashboardEntete from "@/lib/components/dashboardEntete";

interface filterProps{
    user: User
}

export async function querySearch(formData:FormData){
    "use server";

    let query = formData.get("search")?.toString();
  
    if(!query){
        query = "";
    }
    redirect("./allProduct?query=" + `${query}`);
}

export default function ProductFilter({user}:filterProps){

    return(
        <div className={styles.content}>
            <DashboardEntete user={user}>VOIR LES PRODUITS</DashboardEntete>

            <div className={styles.search}>
                <form action={querySearch}>
                    <input type="text" name="search" id="search"/>
                    <button type="submit">search</button>
                </form>
            </div>

        </div>
    )
}