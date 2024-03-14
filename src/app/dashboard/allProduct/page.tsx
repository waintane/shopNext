import HeaderDashboard from "../headerDashboard";
import styles from "../../../style/components/dashboard.module.scss";
import authOptions from "@/lib/components/authOptions";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import ProductPanel from "./productPanel";
import ProductFilter from "./productFilter";
import { Product } from "@prisma/client";

/* Composant page qui vérifie que le user est belle et bien admin pour ensuite afficher tous les produits
si aucune recherche n'a été faite et des items spécifique si une recherche a été faite.

cette page appelle les composants productFilter et productPanel

Composant côté serveur
*/

interface searchParamsProps {
    searchParams: {query:string}
}

export default async function AllProduct({searchParams: {query}}: searchParamsProps){
    const session:any = await getServerSession(authOptions);
    const user = session?.user;

    if(user?.status != "admin"){
        redirect("/");
    }
    let products:Product[] = [];

    if(!query){
        products = await prisma.product.findMany({
            orderBy: {createdAt: "desc"},
        })
    }
    if(query){
        products = await prisma.product.findMany({
            where: {
                OR: [
                    {category: {contains: query.toLowerCase()}},
                    {sex: {contains: query.toLowerCase()}},
                    {name: {contains: query}}
                ]
            },
        })
    }


    return(
        <div className={styles.dashboardPage}>
            <HeaderDashboard></HeaderDashboard>
            <div>   
                <ProductFilter user={user}></ProductFilter>
                {products.map(e => (
                    <ProductPanel product={e}  key={e.id}></ProductPanel>
                ))}
            </div>
        </div>
    )
}