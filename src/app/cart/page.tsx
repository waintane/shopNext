import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import styles from "../../style/components/cart.module.scss";
import { cookies } from "next/headers";
import ItemPanel from "./itemPanel";
import Title from "@/lib/components/title";
import BannerPoint from "@/lib/components/bannerPoint";
import Footer from "@/lib/components/footer";

type ProductProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantitySmall: number | null;
    quantityMedium: number | null;
    quantityLarge: number | null;
    category: string;
    sex: string | null;
    createdAt: Date;
    updatedAt: Date;
    currentSize: string | null | undefined;
    currentQuantity: number | null | undefined;
} | null

async function removeElement(formData:FormData){
    "use server";

    const target = formData.get("id")?.toString();

    const cart = cookies().get("cart");
    let array = JSON.parse(cart?.value!);
    
    for(let i=0; i<array.length; i++){
        if(array[i].id == target){
            array.splice(i,1);
        }
    }

    cookies().set("cart", JSON.stringify(array));
}

export default async function Cart(){

    const cart = cookies().get("cart");
    let products:ProductProps[] = [];
    let array:any = [];
    if(cart){
        const array = JSON.parse(cart?.value!);

        for(let i=0; i<array.length; i++){
            const product = await prisma.product.findUnique({
                where : {id : array[i].id}
            });
            products.push(product);
            products[i]!.currentSize = array[i].size;
            products[i]!.currentQuantity = array[i].quantity;
        }
    }

    return(
        <div className={styles.cart}>
            <Title>MON PANIER</Title>
            <div className={styles.heading}>
                <h4 className={styles.productName}>Produit</h4>
                <h4 className={styles.size}>Taille</h4>
                <h4 className={styles.quantity}>Quantité</h4>
                <h4 className={styles.price}>Prix</h4>
                <h4 className={styles.total}>total</h4>
            </div>
            {products.map(e => (
                <div className={styles.panelContainer}>
                    <ItemPanel item={e} key={e?.id}></ItemPanel>
                    <form action={removeElement}>
                        <input type="text" name="id" value={e?.id} style={{display : "none"}}/>
                        <button className={styles.remove}>x</button>
                    </form>
                </div>
            ))}

            <BannerPoint></BannerPoint>
            <Footer></Footer>
        </div>
    )
}