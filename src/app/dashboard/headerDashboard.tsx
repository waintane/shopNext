import Link from "next/link";
import styles from "../../style/components/headerDashboard.module.scss";
import BurgerDashboard from "./burgerDashboard";

/* Comopsant header pour toutes les pages du dashboard 

Composant côté serveur
*/

export default function HeaderDashboard(){
    return(
        <header className={styles.headerMobile}>
            <BurgerDashboard></BurgerDashboard>
            <div className={styles.header}>
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
            </div>
            <div className={styles.dashboardMenuMobile + " dashboardMenuMobile"}>
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
            </div>
        </header>
    )
}