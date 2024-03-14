
import { Product, User } from "@prisma/client";
import ProductPanel from "./productPanel";
import { redirect } from "next/navigation";
import styles from "../../../style/components/allProductContent.module.scss";
import DashboardEntete from "@/lib/components/dashboardEntete";

interface filterProps{
    user: User
}

/* Composant qui génère le formulaire de recherche de produits pour la page allProduct 

Composant côté serveur
*/

async function querySearch(formData:FormData){
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
            <div className={styles.container}>
                <div className={styles.heading}>
                    <div className={styles.panel}>
                        <h4>Produit</h4>
                        <h4 className={styles.categoryRemove}>Categories</h4>
                        <form action={querySearch}>
                            <h4 className={styles.priceRemove}>Prix</h4>
                            <input type="text" name="search" id="search" placeholder="rechercher"/>
                            <button type="submit" style={{display:"none"}}>search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}