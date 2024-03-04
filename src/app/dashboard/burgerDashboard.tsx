"use client";

import styles from "../../style/components/headerDashboard.module.scss";

let menuShowDashboard = false;

export default function BurgerDashboard(){

    function burger(){

        const menu = document.querySelector(".dashboardMenuMobile") as any;
        const line = document.querySelector(".line2headerDashboard") as any;
        console.log(menu);
        if(!menuShowDashboard){
            menu.style.transform = "translateY(0px)";
            line.style.width = "50%";
            menuShowDashboard = true;
        }else{
            menu.style.transform = "translateY(-70vh)";
            line.style.width = "100%";
            menuShowDashboard = false;
        }
    }

    return(
        <div className={styles.menuBurger + " " + styles.mobile} onClick={() => burger()}>
            <div className={styles.line}></div>
            <div className={styles.line + " line2headerDashboard"}></div>
        </div>
    )
}