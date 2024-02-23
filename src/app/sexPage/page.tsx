import styles from "../../style/components/sexPage.module.scss";
import bannerHomme from "../../img/homme.png";
import bannerFemme from "../../img/femme.png";
import { prisma } from "@/lib/db/prisma";
import Title from "@/lib/components/title";
import ProductCard from "@/lib/components/productCard";
import { redirect } from "next/navigation";
import FilterPage from "./filterPage";

interface searchParamsProps {
    searchParams : {sex:string, category:string},
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
            <Title> Nos produits {sex==null?"" : "pour"} {sex=="homme"?"homme" : ""} {sex=="femme"?"femme" : ""}</Title>
            <h2> {category==null? "Tout": category} </h2>
            <section>
                <div className={styles.filter}>
                    <FilterPage categories={categories} sex={sex}></FilterPage>
                </div>
                <div className={styles.itemSection}>
                    {products.map(e => (
                        <ProductCard product={e} key={e.id}></ProductCard>
                    ))}
                </div>
            </section>
        </div>
    )
}