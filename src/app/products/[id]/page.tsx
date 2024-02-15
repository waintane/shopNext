import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import styles from "../../../style/components/productPage.module.scss";

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

    const product = await getProduct(id)

    return(
        <div className={styles.productPage}>
            <div className={styles.imgContainer}>
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div>
                <h1> {product.name} </h1>
                <p> {product.description} </p>
                <p> {(product.price) / 100}$ </p>
            </div>
        </div>
    )
}