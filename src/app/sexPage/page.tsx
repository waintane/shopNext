import styles from "../../style/components/sexPage.module.scss";
import bannerHomme from "../../img/homme.png";
import bannerFemme from "../../img/femme.png";
import { prisma } from "@/lib/db/prisma";
import Title from "@/lib/components/title";
import ProductCard from "@/lib/components/productCard";
import { redirect } from "next/navigation";
import FilterPage from "./filterPage";
import BannerPoint from "@/lib/components/bannerPoint";
import RemoveRefreshButton from "@/lib/components/removeRefreshButton";

interface searchParamsProps {
    searchParams : {sex:string, category:string},
}

export async function reset(formData:FormData){
    "use server";

    const sex = formData.get("sex")?.toString();

    redirect("./sexPage?sex=" + `${sex}`);
}

export default async function SexPage({searchParams: {sex, category}} : searchParamsProps){

    let products:any;

    const categories = await prisma.categories.findMany({
        orderBy: {id : "desc"}
    })

    if(sex){
        if(category){
            products = await prisma.product.findMany({
                where: {sex : sex,
                        category : category
                }
            })
        }else{
            products = await prisma.product.findMany({
                where : {sex: sex}
            })
        }
    } 
    else if(!sex){
        if(category){
            products = await prisma.product.findMany({
                where : {category: category}
            })
        }else{
            products = await prisma.product.findMany({
                orderBy : {createdAt : "desc"},
            })
        }
    }

    return(
        <div className={styles.sexPage}>

            <div className={styles.banniere}>
                <div className={styles.visuel}>
                    <div><img src={sex=="femme"?bannerFemme.src : bannerHomme.src} alt="" /></div>
                </div>
                <div className={styles.sousBanniere}>
                    <p>Livraison rapide</p>
                    <p>Livraison rapide</p>
                    <p>Livraison rapide</p>
                </div>
            </div>

            <Title> NOS PRODUITS {sex==null?"" : "POUR"} {sex=="homme"?"HOMME" : ""} {sex=="femme"?"FEMME" : ""}</Title>

            <h2 className={styles.category}> {category==null? "TOUT": category.toUpperCase()} </h2>

            <section>
                <div className={styles.filter}>
                    <FilterPage categories={categories} sex={sex}></FilterPage>
                </div>
                <div className={styles.itemSection}>
                    {/* <div className={styles.line}> {category? <form action={reset} > <input type="text" value={sex} name="sex" style={{display: 'none'}}  /> <button type="submit"> {category? category + " x" : ""} </button></form> : ""} </div> */}
                    <RemoveRefreshButton category={category} sex={sex}></RemoveRefreshButton>
                    <div className={styles.catalog}>
                        {products.map(e => (
                            <ProductCard product={e} key={e.id}></ProductCard>
                        ))}
                    </div>
                </div>
            </section>
            <BannerPoint></BannerPoint>
        </div>
    )
}