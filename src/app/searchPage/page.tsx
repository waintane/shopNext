import ProductCard from "@/lib/components/productCard";
import styles from "../../style/components/searchPage.module.scss";
import { prisma } from "@/lib/db/prisma";
import BannerPoint from "@/lib/components/bannerPoint";

interface searchParamsProps {
    searchParams : {query:string}
}

export default async function SearchPage({searchParams: {query}}: searchParamsProps){

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
                    {name: {contains: query}},
                    {description: {contains: query}},
                ]
            },
        })
    }

    return(
        <div className={styles.searchPage}>
            <section>
                {products.map(e => (
                    <ProductCard product={e} key={e.id}></ProductCard>
                ))}
            </section>
            {products?.length==0? <div className={styles.none}><p>aucun produit correspondant</p></div> : ""}
            <BannerPoint></BannerPoint>
        </div>
    )
}