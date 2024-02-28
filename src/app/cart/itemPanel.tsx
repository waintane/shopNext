import { Product } from "@prisma/client";
import styles from "../../style/components/cart.module.scss";

interface itemProps {
    item : any
}

export default function ItemPanel({item}:itemProps){
    return(
        <div className={styles.panel}>
            <img src={item.imageUrl} alt={item.name} />
            <p> {item.name} </p>
            <p> {item.currentSize} </p>
            <p> {item.currentQuantity} </p>
            <p> {item.price/100}$ </p>
            <p> {(item.price * item.currentQuantity) / 100}$ </p>
        </div>
    )
}