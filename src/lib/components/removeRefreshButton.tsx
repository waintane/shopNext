"use client";

import { useRouter } from "next/navigation";
import styles from "../../style/components/sexPage.module.scss";


interface buttonProps {
    category: string,
    sex : string
}

export default function RemoveRefreshButton({category,sex}:buttonProps){

    const router = useRouter();

    function reset(){
        const sex = document.querySelector(".resetButton")?.innerHTML;
        console.log(sex);
        router.push("./sexPage?sex=" + `${sex}`, { scroll: false });
    }

    return(
        <div className={styles.line}> 
            {category? <div onClick={reset} > 
            <p className="resetButton" style={{display: 'none'}}>{sex}</p>
            <button type="submit"> {category? category + " x" : ""} </button>
            </div> : ""} 
        </div>
    )
}