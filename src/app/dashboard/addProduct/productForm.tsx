import { useState } from "react";
import CategorySelection from "./categorySelection";


export default function ProductForm(){

    const [data, setData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        category: "",
        price: 0,
        quantity: 0,

    })
    return(

        <form action="">
            <div>
                <label htmlFor="name">Nom du produit : </label>
                <input type="text" id="name" value={data.name} placeholder="nom du produit" required
                onChange={(e) => {setData({...data, name: e.target.value})}}
                />
            </div>
            <div>
                <label htmlFor="description">Description du produit : </label>
                <textarea id="description" value={data.description} placeholder="description du produit" required
                onChange={(e) => {setData({...data, description: e.target.value})}}
                ></textarea>
            </div>
            <div>
                <label htmlFor="imageUrl">Url de l'image du produit</label>
                <input type="text" id="imageUrl" value={data.imageUrl} placeholder="https://images" required
                onChange={(e) => {setData({...data, imageUrl: e.target.value})}}
                />
            </div>
            <div>

            </div>
        </form>
    )
}