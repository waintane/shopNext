const bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:any){
    const body = await req.json();
    const name = body.data.name;
    const email = body.data.email;
    const status = "client";
    let password = body.data.password;

    console.log(body);

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(exist){
        return new NextResponse("User already exists", {status: 400});
    }

    password = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {name, email, password, status}
    });

    return NextResponse.json(user);
}