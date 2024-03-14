"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* Composant barre de recherche dans le header permettant d'afficher tous les produits recherché
dans la page searchProduct

Composant côté client
*/

export default function SearchHeader(){
    const [query, setQuery] = useState("");
    const router = useRouter();

    function search(e:any){
        setQuery(e.target.value);

        router.push("/searchPage?query=" + `${e.target.value}`);
    }

    return(
        <div>
            <input type="text" name="search" id="" value={query} onChange={(e) => search(e)}/>
        </div>
    )
}