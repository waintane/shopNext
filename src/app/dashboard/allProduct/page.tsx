import HeaderDashboard from "../headerDashboard";
import styles from "../../../style/components/dashboard.module.scss";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import ProductPanel from "./productPanel";
import ProductFilter from "./productFilter";
import { Product } from "@prisma/client";

interface searchParamsProps {
    searchParams: {query:string}
}

export default async function AllProduct({searchParams: {query}}: searchParamsProps){
    const session:any = await getServerSession(authOptions);
    const user = session?.user;

    if(user?.status != "admin"){
        redirect("/");
    }
    let products:any;

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
                <ProductFilter products={products}></ProductFilter>
                {products.map(e => (
                    <ProductPanel product={e}  key={e.id}></ProductPanel>
                ))}
            </div>
        </div>
    )
}