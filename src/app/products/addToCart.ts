import { cookies } from 'next/headers';

/* fonction add to cart qui permet de sauvegarde le cart dans un cookie qui sera ensuite lu 
dans la page cart */

type arrayType = {
    id:string | undefined
    quantity:number
    size:string | undefined
}

export default async function addToCart(formData:FormData){
    "use server";

    const size = formData.get("size")?.toString();
    const productId = formData.get("id")?.toString();

    let currentCart = cookies().get("cart");

    if(currentCart){
        let array:arrayType[] = JSON.parse(currentCart?.value!);

        let state = false;

        array.map(e => {
            if(e.id == productId){
                e.quantity += 1;
                state = true;
                return;
            }
        })
        if(!state){
            array.push({size: size, id: productId, quantity: 1});
        }
        cookies().set("cart", JSON.stringify(array));
    }else{
        let element = JSON.stringify([{size: size, id: productId ,quantity: 1}]);

        cookies().set("cart", element);
    }
}