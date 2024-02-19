
import { Product } from "@prisma/client";
import ProductPanel from "./productPanel";
import { redirect } from "next/navigation";

interface productsProps {
    products: Product[]
}
export async function querySearch(formData:FormData){
    "use server";

    let query = formData.get("search")?.toString();
  
    if(!query){
        query = "";
    }
    redirect("./allProduct?query=" + `${query}`);
}




export default function ProductFilter({products}:productsProps){

    return(
        <div>
            <div>
                <form action={querySearch}>
                    <input type="text" name="search" id="search"/>
                    <button type="submit">search</button>
                </form>
            </div>
            {products.map(e => (
                    <ProductPanel product={e} key={e.id}></ProductPanel>
            ))}
        </div>
    )
}