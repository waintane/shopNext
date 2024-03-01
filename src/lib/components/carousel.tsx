
import { Product } from "@prisma/client";
import ProductCard from "./productCard";
import styles from "../../style/microComponents/carousel.module.scss";
import ButtonCarousel from "./microComponents/buttonCarousel";

interface productsProps {
    products : Product[]
}

export default function Carousel({products}: productsProps){
    return(
        <div className={styles.carousel}>
            <div className={styles.containerCarousel + " carousel"}>
                <ButtonCarousel direction={"left"}> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </ButtonCarousel>
                {products.map(e => (
                <ProductCard product={e} key={e.id}></ProductCard>
                ))}
                <ButtonCarousel direction={"right"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </ButtonCarousel>
            </div>
        </div>
    )
}