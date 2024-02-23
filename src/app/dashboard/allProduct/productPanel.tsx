import { Categories, Product } from "@prisma/client"
import styles from "../../../style/components/categoryPanel.module.scss";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

interface productsPanelProps {
    product: Product
}
async function removeCategory(formData:FormData){
    "use server";

    const id = formData.get("id")?.toString();
    await prisma.product.delete({
        where: {id: id},
    });

    redirect("./allProduct");
}

async function updateItem(formData:FormData){
    "use server";

    const id = formData.get("id")?.toString();

    if(id){
        redirect("./allProduct/updateProduct?target="+`${id}`);
    }
}

export default function ProductPanel({product}:productsPanelProps){
    return(
        <div>
        <form action={removeCategory} className={styles.panel}>
            <img src={product.imageUrl} alt={product.name} />
            <p> {product.name} </p>
            <p>Categorie: {product.category} </p>
            <input style={{display: 'none'}} type="text" value={product.id} name="id" />
            <button type="submit">x</button>
        </form>
        <form action={updateItem}>
            <input style={{display: 'none'}} type="text" value={product.id} name="id" />
            <button type="submit">Modifier</button>
        </form>
        </div>
    )
}