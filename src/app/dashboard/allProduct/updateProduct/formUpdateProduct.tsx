import { Product } from "@prisma/client";
import styles from "../../../../style/components/productUpdate.module.scss";
import { prisma } from "@/lib/db/prisma";
import FormSubmitButton from "@/lib/components/formSubmitButton";
import { redirect } from "next/navigation";
import DashboardEntete from "@/lib/components/dashboardEntete";
import Link from "next/link";

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
                        <input style={{display: 'none'}} type="text" value={product.id} name="id" />
                        <div>
                            <label htmlFor="name">Nom du produit: </label>
                            <input required type="text" id="name" name="name"  placeholder={product.name}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description du produit: </label>
                            <textarea required name="description" id="description" placeholder={product.description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="imageUrl">Image du produit: </label>
                            <input required type="text" name="imageUrl" id="imageUrl" placeholder={product.imageUrl}/>
                        </div>
                        <div>
                            <label htmlFor="category">Catégorie du produit: </label>
                            <select required name="category" id="category">
                                <option value={product.category}> {product.category} </option>
                                {categories.map(e => (
                                    <option value={e.name} key={e.id}> {e.name} </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sex">Clientèle cible du produit: </label>
                            <select required name="sex" id="sex">
                                <option value={product.sex!}> {product.sex} </option>
                                <option value="homme">Homme</option>
                                <option value="femme">Femme</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="quantitySmall">Quantité petit en stock : </label>
                            <input required type="text" name="quantitySmall" id="quantitySmall" placeholder="quantity petit"/>
                        </div>
                        <div>
                            <label htmlFor="quantityMedium">Quantité medium en stock : </label>
                            <input required type="text" name="quantityMedium" id="quantityMedium" placeholder="quantity medium"/>
                        </div>
                        <div>
                            <label htmlFor="quantityLarge">Quantité large en stock : </label>
                            <input required type="text" name="quantityLarge" id="quantityLarge" placeholder="quantity large"/>
                        </div>
                        <div>
                            <label htmlFor="price">Prix du produit</label>
                            <input required type="number" name="price"/>
                        </div>
                        <FormSubmitButton>Modifier</FormSubmitButton>
                    </form>
                </div>
            </div>
        </div>
    )
}