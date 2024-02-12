"use server"

import { prisma } from "@/lib/db/prisma";

export default async function CategorySelection(){
    const categories = await prisma.categories.findMany({
        orderBy: {id: "desc"}
    })
    return(
        <select name="test" id="">
            {categories.map(category => (
            <option value={category.name} key={category.id}> {category.name} </option>
            ))}
        </select>
    )
}