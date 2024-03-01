import { Product } from "@prisma/client";
import Link from "next/link";
import styles from "../../style/components/productCard.module.scss";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ProductCardProps {
    product: Product
}

export async function checkCookiesItem(formData:FormData){
    "use server";

    const id = formData.get("product")?.toString();

    let itemWatchedState = false;
    let itemWatched = await cookies().get("lastWatched");

    if(itemWatched){
        let array = JSON.parse(itemWatched?.value!);
        
        if(!Array.isArray(array)){
            array = JSON.parse(array);
        }
        
        if(array.length < 7){
            for(let i=1; i<array.length; i++){
                if(array[i].id == id){
                    itemWatchedState = true;
                }
            }
            if(!itemWatchedState){
                array.push({id:id});
            }
            cookies().set("lastWatched", JSON.stringify(array));
            redirect("/products/"+id);
        }
        else if(array.length >= 7){
            for(let i=1; i<array.length; i++){
                if(array[i].id == id){
                    itemWatchedState = true;
                }
            }
            if(!itemWatchedState){
                array.shift();
                array.push({id:id});
                cookies().set("lastWatched", JSON.stringify(array));
                redirect("/products/"+id);
            }
            redirect("/products/"+id);
        }

    }else{
        let element = JSON.stringify([{id:id}]);

        cookies().set("lastWatched", JSON.stringify(element)); 
        redirect("/products/"+id);
    }
}

export default function ProductCard({product}: ProductCardProps){
    return(
        <form action={checkCookiesItem} className={styles.parent + " productCard"}>
            <input type="text" style={{display:"none"}} value={product.id} name="product"/>
            <button type="submit">
                <div className={styles.productCard}>
                    <div className={styles.card}>
                        <div className={styles.containerImg}>
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className={styles.content}>
                            <h2> {product.name} </h2>
                            <p> {product.price / 100}$ </p>
                        </div>                
                    </div>
                    <div className={styles.addCart}>
                        <p>Ajouter au panier</p>
                    </div>
                </div>
            </button>
        </form>
    )
}