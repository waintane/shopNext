import Link from "next/link";
import styles from "../../style/components/header.module.scss";
import SearchHeader from "./searchHeader";
import BurgerButton from "./burgerButton";

export default function Header(){
    return(
        <header>
            
            <div className={styles.header}>
                <BurgerButton></BurgerButton>
                <div className={styles.separation}>
                    <Link className={styles.desktop} href="/sexPage?sex=homme">Homme</Link>
                    <Link className={styles.desktop} href="/sexPage?sex=femme">Femme</Link>
                </div>
                <Link className={styles.title} href="/">NextShop</Link>
                <div className={styles.separation}>
                    <form className={styles.desktop}>
                        <SearchHeader></SearchHeader>
                    </form>
                    <Link className={styles.login + " " + styles.desktop} href="/login">                    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </Link>
                    <Link className={styles.cart} href="/cart">VOTRE PANIER</Link>
                </div>
            </div>

            <div className={styles.mobile + " " + styles.menuMobile + " menuMobile"}>
                <form>
                    <SearchHeader></SearchHeader>
                </form>
                <Link href="/sexPage?sex=homme">Homme</Link>
                <Link href="/sexPage?sex=femme">Femme</Link>
            </div>
        </header>
    )
}