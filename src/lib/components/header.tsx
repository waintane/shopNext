import Link from "next/link";
import styles from "../../style/components/header.module.scss";

export default function Header(){
    return(
        <header className={styles.header}>
            <Link href="/register">Register Page</Link>
            <br></br>
            <Link href="/login">Login Page</Link>
            <br></br>
            <a href="/dashboard">Dashboard</a>
            <br></br>
            {/* <Link href="/dashboard">dashboard</Link> */}
        </header>
    )
}