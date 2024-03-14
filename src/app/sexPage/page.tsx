import styles from "../../style/components/sexPage.module.scss";
import bannerHomme from "../../img/homme.jpg";
import bannerFemme from "../../img/femme.jpg";
import { prisma } from "@/lib/db/prisma";
import Title from "@/lib/components/title";
import ProductCard from "@/lib/components/productCard";
import { redirect } from "next/navigation";
import FilterPage from "./filterPage";
import BannerPoint from "@/lib/components/bannerPoint";
import RemoveRefreshButton from "@/lib/components/removeRefreshButton";
import Footer from "@/lib/components/footer";
import { Product } from "@prisma/client";

/* Composant page, affichant chaque item lié au sex de la page ouverte ainsi que les items lié au filtre 
appliqué à l'aide des query dans l'url 

Composant côté serveur
*/

interface searchParamsProps {
    searchParams : {sex:string, category:string},
}

async function reset(formData:FormData){
    "use server";

    const sex = formData.get("sex")?.toString();

    redirect("./sexPage?sex=" + `${sex}`);
}

export default async function SexPage({searchParams: {sex, category}} : searchParamsProps){

    let products:Product[] = [];

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
                    <RemoveRefreshButton category={category} sex={sex}></RemoveRefreshButton>
                    <div className={styles.catalog}>
                        {products.map(e => (
                            <ProductCard product={e} key={e.id}></ProductCard>
                        ))}
                    </div>
                </div>
            </section>
            <BannerPoint></BannerPoint>
            <Footer></Footer>
        </div>
    )
}