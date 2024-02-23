import { Categories } from "@prisma/client";
import { redirect } from "next/navigation";
import styles from "../../style/microComponents/pageMenu.module.scss";

export async function queryFilter(formData:FormData){
    "use server";

    const sex = formData.get("sex")?.toString();
    const category = formData.get("category")?.toString();
    
    redirect("./sexPage?sex=" + `${sex}` + "&category=" + `${category}`);
}

interface filterProps{
    categories : Categories[],
    sex : string
}


export default function FilterPage({categories, sex}:filterProps){

    return(
        <div className={styles.pageMenu}>
            <h3>CATEGORIES</h3>
            <div className={styles.option}>
                <ul>
                {categories.map(e => (
                    <li key={e.id}>
                        <form action={queryFilter}>
                            <input type="text" value={sex} name="sex" style={{display: 'none'}}/>
                            <input type="text" value={e.name} name="category" style={{display: 'none'}}/>
                            <button type="submit"> {e.name.toUpperCase()} </button>
                        </form>
                    </li>
                 ))}
                </ul>
            </div>
        </div>
    )
}