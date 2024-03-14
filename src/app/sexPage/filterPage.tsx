"use client"

import { Categories } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import styles from "../../style/microComponents/pageMenu.module.scss";

/* Composant filtre de la page des produits pour homme ou femme pour chaque catégorie 
dans la databse il créer un filtre qui s'applique à homme et femme

Composante côté client
*/

interface filterProps{
    categories : Categories[],
    sex : string
}

export default function FilterPage({categories, sex}:filterProps){
    const router = useRouter();

    function queryFilter(value:string){

        const sex = document.querySelector(`.${value}`+" .sex")?.innerHTML;
        const category = document.querySelector(`.${value}`+" .category")?.innerHTML;

        router.push("./sexPage?sex="+ `${sex}` + "&category=" + `${category}`, { scroll: false });
    }

    return(
        <div className={styles.pageMenu}>
            <h3>CATEGORIES</h3>
            <div className={styles.option}>
                <ul>
                {categories.map(e => (
                    <li key={e.id} className={e.name}>
                        <p className="sex"style={{display: 'none'}}>{sex}</p>
                        <p className="category"style={{display: 'none'}}>{e.name}</p>
                        <button onClick={() => queryFilter(e.name)}> {e.name.toUpperCase()} </button>
                    </li>
                 ))}
                </ul>
            </div>
        </div>
    )
}