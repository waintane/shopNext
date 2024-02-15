import { Categories } from "@prisma/client"
import styles from "../../../style/components/categoryPanel.module.scss";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

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
        <form action={removeCategory} className={styles.panel}>
            <p> {category.name.charAt(0).toUpperCase() + category.name.slice(1)} </p>
            <input style={{display: 'none'}} type="text" value={category.id} name="id" />
            <button type="submit">x</button>
        </form>
    )
}