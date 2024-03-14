import styles from "../../style/microComponents/bannerPoint.module.scss";

/* Composant visuel du site, la bannière de point 

Composant côté serveur
*/

export default function BannerPoint(){
    return(
        <div className={styles.bannerPoint}>
            <h1>NextShop programme de point</h1>
            <div className={styles.lines}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Gagne 5 points pour chaque tranche de 20$ depenser pour par la suite gagner des coupons rabais</p>
        </div>
    )
}