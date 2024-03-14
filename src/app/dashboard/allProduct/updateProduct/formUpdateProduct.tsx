import { Product } from "@prisma/client";
import styles from "../../../../style/components/productUpdate.module.scss";
import { prisma } from "@/lib/db/prisma";
import FormSubmitButton from "@/lib/components/formSubmitButton";
import { redirect } from "next/navigation";
import DashboardEntete from "@/lib/components/dashboardEntete";
import Link from "next/link";
import Input from "./input";

/* Composant formulaire d'envoie fait en côté serveur fesant appelle aux inputs fields en côté client pour
permettre à l'admin de les modifier plus facilement.

Composant côté serveur.
*/

interface productProps {
    product: Product
}

async function updateProduct(formData:FormData){
    "use server";

    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const category = formData.get("category")?.toString();
    const sex = formData.get("sex")?.toString();
    const quantitySmall = Number(formData.get("quantitySmall") || 0);
    const quantityMedium = Number(formData.get("quantityMedium") || 0);
    const quantityLarge = Number(formData.get("quantityLarge") || 0);
    const price = Number(formData.get("price") || 0);

    await prisma.product.update({
        where: {id:id},
        data: {name, description, imageUrl, category, sex, quantitySmall , quantityMedium , quantityLarge, price}
    });

    redirect("./");
}

export default async function FormUpdateProduct({product}:productProps){

    const categories = await prisma.categories.findMany({
        orderBy: {id:"desc"},
    });

    return(
        <div className={styles.productUpdate}>
            <DashboardEntete user={{}}>MODIFIER LE PRODUIT</DashboardEntete>
            <Link href="./">retour</Link>
            <h2 className={styles.productName}> {product.name} </h2>
            <div className={styles.productDisplayForm}>
                <div className={styles.containerImage}>
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div>
                    <form action={updateProduct}>
                        <Input product={product} categories={categories}></Input>
                        <FormSubmitButton>Modifier</FormSubmitButton>
                    </form>
                </div>
            </div>
        </div>
    )
}