import styles from "../../style/microComponents/title.module.scss";

type titleProps = {
    children: React.ReactNode,
}

/* Composant visuel pour afficher les titres */

export default function Title({children}:titleProps){
    return(
        <div className={styles.title}>
            <div className={styles.lineContainer}>
                <div></div>
                <div></div>
            </div>
            <h1> {children} </h1>
            <div className={styles.lineContainer}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}