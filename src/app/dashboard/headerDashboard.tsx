import Link from "next/link";
import styles from "../../style/components/headerDashboard.module.scss";

export default function HeaderDashboard(){
    return(
        <header className={styles.header}>
            <div className={styles.nav}>
                <Link href="/dashboard">TABLEAU DE BORD</Link>
                <div className={styles.line}></div>
            </div>
            <div className={styles.nav}>
                <Link href="/dashboard/addProduct">AJOUTER UN PRODUIT</Link>
                <div className={styles.line}></div>
            </div>
            <div className={styles.nav}>        
                <Link href="/dashboard/allProduct">VOIR LES PRODUITS</Link>
                <div className={styles.line}></div>
            </div>
            <div className={styles.nav}>
                <Link href="/dashboard/panelCategory">CATEGORIES</Link>
                <div className={styles.line}></div>
            </div>
        </header>
    )
}