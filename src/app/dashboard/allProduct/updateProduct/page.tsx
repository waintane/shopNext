import authOptions from "@/lib/components/authOptions";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import HeaderDashboard from "../../headerDashboard";
import styles from "../../../../style/components/dashboard.module.scss";
import Link from "next/link";
import FormUpdateProduct from "./formUpdateProduct";

interface searchParamsProps {
    searchParams: {target:string}
}

export default async function updateProduct({searchParams: {target}}: searchParamsProps){
    const session:any = await getServerSession(authOptions);
    const user = session?.user;

    if(user?.status != "admin"){
        redirect("/");
    }

    let product:any;

    if(!target){
        redirect("./allProduct");
    }
    if(target){
        product = await prisma.product.findUnique({
            where : {id:target}
        })
    }

    return(
        <div className={styles.dashboardPage}>
            <HeaderDashboard></HeaderDashboard>
            <div>
                <FormUpdateProduct product={product} key={product.id}></FormUpdateProduct>
            </div>
        </div>
    )
}