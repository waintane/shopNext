import { Product } from "@prisma/client";
import styles from "../../style/components/cart.module.scss";

interface itemProps {
    item : any
}

export default function ItemPanel({item}:itemProps){
    return(
        <div className={styles.panel}>
            <img src={item.imageUrl} alt={item.name} />
            <p className={styles.productName}> {item.name} </p>
            <p className={styles.size}> {item.currentSize} </p>
            <p className={styles.quantity}> {item.currentQuantity} </p>
            <p className={styles.price}> {item.price/100}$ </p>
            <p className={styles.total}> {(item.price * item.currentQuantity) / 100}$ </p>
        </div>
    )
}