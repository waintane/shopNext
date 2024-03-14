import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import styles from "../../../style/components/categoryPage.module.scss";

/* Composant permettant de créer les différentes catégorie 

Composant côté serveur
*/

async function createCategory(formData:FormData){
    "use server";

    const name = formData.get("category")?.toString().toLowerCase();

    if(!name){
        throw Error ("missing required fields");
    }
    await prisma.categories.create({
        data: {name}
    })

    redirect("./panelCategory");
}

export default async function AddCategory(){
    return(
        <div className={styles.content}>
            <form action={createCategory} className={styles.addCategory}>
                <input required type="text" name="category" placeholder="category"/>
                <button type="submit">nouvelle categorie</button>
            </form>
        </div>
    )
} 