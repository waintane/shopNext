import { Categories } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import FormSubmitButton from "@/lib/components/formSubmitButton";
import { redirect } from "next/navigation";

type FormAddProductProps = {
    categories : Categories[]
}

async function addProduct(formData:FormData){
    "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const category = formData.get("category")?.toString();
    const sex = formData.get("sex")?.toString();
    const quantity = Number(formData.get("quantity") || 0);
    const price = Number(formData.get("price") || 0);

    if(!name || !description || !imageUrl || !category || !sex || !quantity || !price){
        throw Error ("misssing required fields");
    }

    await prisma.product.create({
        data: {name, description, imageUrl, category, sex, quantity, price}
    });

    redirect("./addProduct");
}

export default function FormAddProduct({categories}:FormAddProductProps){
    return(
        <div>
            <h1>Add product</h1>
            <form action={addProduct}>
                <div>
                    <label htmlFor="name">Name of the product: </label>
                    <input required type="text" name="name" id="name" placeholder="Name"/>
                </div>
                <div>
                    <label htmlFor="description">Description of the product: </label>
                    <textarea required name="description" id="description" placeholder="Description"></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl">Image of the product: </label>
                    <input required type="text" name="imageUrl" id="imageUrl" placeholder="Image URL"/>
                </div>
                <div>
                    <label htmlFor="category">Categorie du produit: </label>
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
                    <label htmlFor="quantity">The quantity in stock</label>
                    <input required type="text" name="quantity" id="quantity" placeholder="quantity"/>
                </div>
                <div>
                    <label htmlFor="price">Price of the product: </label>
                    <input required type="number" name="price" id="price" placeholder="Price"/>
                </div>
                <FormSubmitButton>Envoyer</FormSubmitButton>
            </form>

            
        </div>
    )
}