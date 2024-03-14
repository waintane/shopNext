import { Categories } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import styles from "../../../style/components/categoryPage.module.scss";
import { redirect } from "next/navigation";

/* Composant permettant de générer individuellement chaque option de catégorie avec le formulaire pour les
effacer au besoin

Composant côté serveur
*/

interface categoriesPanelProps {
    category: Categories
}
async function removeCategory(formData:FormData){
    "use server";

    const id = formData.get("id")?.toString();
    await prisma.categories.delete({
        where: {id: id},
    });

    redirect("./panelCategory");
}

export default function CategoriesPanel({category}:categoriesPanelProps){
    return(
        <div className={styles.content}>
            <form action={removeCategory} className={styles.panel}>
                <p> {category.name.charAt(0).toUpperCase() + category.name.slice(1)} </p>
                <input style={{display: 'none'}} type="text" value={category.id} name="id" />
                <button type="submit">x</button>
            </form>
        </div>
    )
}