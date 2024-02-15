import { Product } from "@prisma/client";
import Link from "next/link";
import styles from "../../style/components/productCard.module.scss";

interface ProductCardProps {
    product: Product
}

export default function ProductCard({product}: ProductCardProps){
    return(
        <Link href={"/products/"+product.id} className={styles.productCard}>
            <div className={styles.containerImg}>
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className={styles.content}>
                <h2> {product.name} </h2>
                <p> {product.price / 100}$ </p>
            </div>
        </Link>
    )
}