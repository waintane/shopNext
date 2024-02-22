import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import styles from "../../../style/components/productPage.module.scss";
import ProductCard from "@/lib/components/productCard";
import Title from "@/lib/components/title";
import BannerPoint from "@/lib/components/bannerPoint";

interface productPageProps {
    params: {
        id:string
    }
}

const getProduct = cache(async (id:string) => {
    const product = await prisma.product.findUnique({where: {id}});
    if(!product) notFound();
    return product;
})

export async function generateMetadata({params: {id}}: productPageProps): Promise<Metadata> {

    const product = await getProduct(id);

    return {
        title: product.name + " - shopNext",
        description: product.description,
        openGraph: {
            images: [{ url: product.imageUrl}]
        }
    }
}

export default async function Products({params: {id}}: productPageProps){

    const product = await getProduct(id);

    const products = await prisma.product.findMany({
        where: {category : product.category},
        take: 4,

    })

    return(
        <div className={styles.productPage}>
            <div className={styles.main}>
                <div className={styles.imgContainer}>
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className={styles.content}>
                    <form action="">
                        <h1> {product.name} </h1>
                        <select name="size" id="size">
                            <option value="small">Petit</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <h3> Categorie:  {product.category} </h3>
                        <p className={styles.description}> {product.description} </p>
                        <div className={styles.formEnd}>
                            <p> {(product.price) / 100}$ </p>
                            <button> Ajouter au panier </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.accueilMsg}>
                <h3>Produits semblables</h3>
            </div>
            <div className={styles.recommendation}>
                {products.map(e => (
                   <ProductCard key={e.id} product={e}></ProductCard> 
                ))}
            </div>
            <BannerPoint></BannerPoint>
        </div>
    )
}