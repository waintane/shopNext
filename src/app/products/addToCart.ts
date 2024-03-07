import { cookies } from 'next/headers';

export default async function addToCart(formData:FormData){
    "use server";

    const size = formData.get("size")?.toString();
    const productId = formData.get("id")?.toString();

    let currentCart = cookies().get("cart");

    if(currentCart){
        let array = JSON.parse(currentCart?.value!);

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