import Link from "next/link";
import styles from "../../style/components/headerDashboard.module.scss";

export default function HeaderDashboard(){
    return(
        <header className={styles.header}>
            <Link href="/dashboard">tableau de bord</Link>
            <Link href="/dashboard/addProduct">Ajouter un produit</Link>
            <Link href="/dashboard/allProduct">Voir les produits</Link>
            <Link href="/dashboard/panelCategory">Categories</Link>
        </header>
    )
}