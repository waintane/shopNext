import { prisma } from "@/lib/db/prisma";
import HeaderDashboard from "../headerDashboard";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/components/authOptions";
import  { redirect } from "next/navigation";
import CategoriesPanel from "./categoriesPanel";
import styles from "../../../style/components/dashboard.module.scss";
import AddCategory from "./addCategory";
import DashboardEntete from "@/lib/components/dashboardEntete";

/* Composant de la page panelCategory vérifiant que l'utilisateur est belle et bien admin et ensuite appelle les composants
Addcategory et categoryPanel

Composant côté serveur
*/

export default async function PanelCategory(){
    const session:any = await getServerSession(authOptions);
    const user = session?.user;

    if(user?.status != "admin"){
        redirect("/");
    }

    const categories = await prisma.categories.findMany({
        orderBy: {id:"desc"},
    })

    return(
        <div className={styles.dashboardPage}>
            <HeaderDashboard></HeaderDashboard>
            <div className={styles.baby}>
                <DashboardEntete user={user}>AJOUTER CATEGORIE</DashboardEntete>
                <AddCategory></AddCategory>
                <div className={styles.categories}>
                    {categories.map(e => (
                        <CategoriesPanel category={e} key={e.id}></CategoriesPanel>
                    ))}
                </div>
            </div>
        </div>
    )
}