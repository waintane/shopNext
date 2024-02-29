
import { Product } from "@prisma/client";
import ProductCard from "./productCard";
import styles from "../../style/microComponents/carousel.module.scss";

interface productsProps {
    products : Product[]
}

export default function Carousel({products}: productsProps){
    return(
        <div className={styles.carousel}>
            <div className={styles.containerCarousel}>
                {products.map(e => (
                <ProductCard product={e} key={e.id}></ProductCard>
                ))}
            </div>
        </div>
    )
}