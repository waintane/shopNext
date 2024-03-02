import Link from "next/link";
import styles from "../../style/components/footer.module.scss";

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <ul>
                    <h3>Utilisateur</h3>
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                    <li>
                        <Link href="/cart">Panier</Link>
                    </li>
                </ul>
                <ul>
                    <h3>Produits</h3>
                    <li>
                        <Link href="/sexPage?sex=femme">Femme</Link>
                    </li>
                    <li>
                        <Link href="/sexPage?sex=homme">Homme</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}