"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchHeader(){
    const [query, setQuery] = useState("");
    const router = useRouter();

    function search(e:any){
        setQuery(e.target.value);

        router.push("/searchPage?query=" + `${query}`);
    }

    return(
        <div>
            <input type="text" name="search" id="" value={query} onChange={(e) => search(e)}/>
        </div>
    )
}