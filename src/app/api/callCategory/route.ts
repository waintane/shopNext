import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function callCategory(){
    const categories = await prisma.categories.findMany({
        orderBy: {id: "desc"}
    });

    console.log(categories);
}