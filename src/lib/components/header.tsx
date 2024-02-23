import Link from "next/link";
import styles from "../../style/components/header.module.scss";

export default function Header(){
    return(
        <header className={styles.header}>
            <Link href="/">Home Page</Link>
            <Link href="/register">Register Page</Link>
            <Link href="/login">Login Page</Link>
            <Link href="/sexPage?sex=homme">Homme</Link>
            <Link href="/sexPage?sex=femme">Femme</Link>
            <a href="/dashboard">Dashboard</a>
            {/* <Link href="/dashboard">dashboard</Link> */}
        </header>
    )
}