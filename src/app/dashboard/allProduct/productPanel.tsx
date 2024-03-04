import { Categories, Product } from "@prisma/client"
import styles from "../../../style/components/allProductContent.module.scss";
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
        <div className={styles.content}>
            <div className={styles.container}>
                <img src={product.imageUrl} alt={product.name} />
                <div className={styles.panel}>
                        <p> {product.name} </p>
                        <p className={styles.categoryRemove}>Categorie: {product.category} </p>
                        <p className={styles.priceRemove}> {(product.price/100)} </p>
                    <div className={styles.forms}>
                        <form action={updateItem} >
                            <input style={{display: 'none'}} type="text" value={product.id} name="id" />
                            <button type="submit">Modifier</button>
                        </form>
                        <form action={removeCategory} >
                            <input style={{display: 'none'}} type="text" value={product.id} name="id" />
                            <button type="submit" className={styles.delete}>x</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}