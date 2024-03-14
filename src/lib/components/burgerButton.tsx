"use client";

import styles from "../../style/components/header.module.scss";

/* Composant menu burger du header il permet d'affiché et de retirer le menu déroulant 

Composant côté client
*/

let menuShow = false;

export default function BurgerButton(){

    function burger(){

        const menu = document.querySelector(".menuMobile") as any;
        const line = document.querySelector(".line2header") as any;

        if(!menuShow){
            menu.style.transform = "translateY(0px)";
            line.style.width = "50%";
            menuShow = true;
        }else{
            menu.style.transform = "translateY(-50vh)";
            line.style.width = "100%";
            menuShow = false;
        }
    }

    return(
        <div className={styles.mobile + " " + styles.burgerButton} onClick={() => burger()}>
            <div className={styles.line}></div>
            <div className={styles.line + " line2header"}></div>
        </div>
    )
}