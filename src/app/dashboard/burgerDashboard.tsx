import styles from "../../style/components/headerDashboard.module.scss";

export default function BurgerDashboard(){
    return(
        <div className={styles.menuBurger + " " + styles.mobile}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
    )
}