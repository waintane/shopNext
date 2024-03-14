"use client";

import { Categories, Product } from "@prisma/client"
import styles from "../../../../style/components/productUpdate.module.scss";
import { useState } from "react";

/* Composant permettant de générer les inputs fileds en côté client pour permettre un processu de modification
plus agréable pour l'utilisateur

Composant côté client
*/

interface productProps {
    product : Product,
    categories: Categories[]
}

export default function Input({product,categories}:productProps){
    const [data, setData] = useState({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
        sex: product.sex,
        quantitySmall: product.quantitySmall,
        quantityMedium: product.quantityMedium,
        quantityLarge: product.quantityLarge,
        price: product.price,
    })


    return(
        <div>
            <div className={styles.formContainer}>
            <input style={{display: 'none'}} type="text" value={product.id} name="id" />
                <div>
                    <label htmlFor="name">Nom du produit: </label>
                    <input required type="text" id="name" name="name"  value={data.name}
                    onChange={e => {setData({...data, name : e.target.value})}}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description du produit: </label>
                    <textarea required name="description" id="description" value={data.description}
                    onChange={e => {setData({...data, description : e.target.value})}}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl">Image du produit: </label>
                    <input required type="text" name="imageUrl" id="imageUrl" value={data.imageUrl}
                    onChange={e => {setData({...data, imageUrl : e.target.value})}}
                    />
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
                    <input required type="text" name="quantitySmall" id="quantitySmall" value={data.quantitySmall!}
                    onChange={e => {setData({...data, quantitySmall : Number(e.target.value)})}}
                    />
                </div>
                <div>
                    <label htmlFor="quantityMedium">Quantité medium en stock : </label>
                    <input required type="text" name="quantityMedium" id="quantityMedium" value={data.quantityMedium!}
                    onChange={e => {setData({...data, quantityMedium : Number(e.target.value)})}}
                    />
                </div>
                <div>
                    <label htmlFor="quantityLarge">Quantité large en stock : </label>
                    <input required type="text" name="quantityLarge" id="quantityLarge" value={data.quantityLarge!}
                    onChange={e => {setData({...data, quantityLarge : Number(e.target.value)})}}
                    />
                </div>
                <div>
                    <label htmlFor="price">Prix du produit</label>
                    <input required type="number" name="price" value={data.price}
                    onChange={e => {setData({...data, price : Number(e.target.value)})}}
                    />
                </div>
            </div>
        </div>
    )
}