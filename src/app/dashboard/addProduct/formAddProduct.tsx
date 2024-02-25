import { Categories, User } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import FormSubmitButton from "@/lib/components/formSubmitButton";
import { redirect } from "next/navigation";
import styles from "../../../style/microComponents/formProduct.module.scss";
import DashboardEntete from "@/lib/components/dashboardEntete";

type FormAddProductProps = {
    categories : Categories[],
    user: User
}

async function addProduct(formData:FormData){
    "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const category = formData.get("category")?.toString();
    const sex = formData.get("sex")?.toString();
    const quantitySmall = Number(formData.get("quantitySmall") || 0);
    const quantityMedium = Number(formData.get("quantityMedium") || 0);
    const quantityLarge = Number(formData.get("quantityLarge") || 0);
    const price = Number(formData.get("price") || 0);

    if(!name || !description || !imageUrl || !category || !sex || !price ){
        throw Error ("misssing required fields");
    }

    await prisma.product.create({
        data: {name, description, imageUrl, category, sex, quantitySmall , quantityMedium , quantityLarge , price}
    });

    redirect("./addProduct");
}

export default function FormAddProduct({categories, user}:FormAddProductProps){
    return(
        <div className={styles.formProduct}>
            <DashboardEntete user={user}>AJOUTER UN PRODUIT</DashboardEntete>
            <form action={addProduct}>
                <div>
                    <label htmlFor="name">Nom du produit: </label>
                    <input required type="text" name="name" id="name" placeholder="Name"/>
                </div>
                <div>
                    <label htmlFor="description">Description du produit: </label>
                    <textarea required name="description" id="description" placeholder="Description"></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl">Image du produit: </label>
                    <input required type="text" name="imageUrl" id="imageUrl" placeholder="Image URL"/>
                </div>
                <div>
                    <label htmlFor="category">Catégorie du produit: </label>
                    <select required name="category" id="category">
                        {categories?.map(e => (
                            <option value={e.name} key={e.id}> {e.name} </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sex">Clientèle cible du produit: </label>
                    <select name="sex" id="sex">
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="quantitySmall">Quantité petit en stock : </label>
                    <input required type="number" name="quantitySmall" id="quantitySmall" placeholder="quantité petit"/>
                </div>
                <div>
                    <label htmlFor="quantityMedium">Quantité medium en stock : </label>
                    <input required type="number" name="quantityMedium" id="quantityMedium" placeholder="quantité medium"/>
                </div>
                <div>
                    <label htmlFor="quantityLarge">Quantité large en stock : </label>
                    <input required type="number" name="quantityLarge" id="quantityLarge" placeholder="quantité large"/>
                </div>
                <div>
                    <label htmlFor="price">Prix du produit: </label>
                    <input required type="number" name="price" id="price" placeholder="Price"/>
                </div>
                <FormSubmitButton>Envoyer</FormSubmitButton>
            </form>

            
        </div>
    )
}