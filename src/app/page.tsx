import Link from "next/link";
import Header from "@/lib/components/header";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/lib/components/productCard";
import styles from "../style/components/homePage.module.scss";

export default async function Home() {
    const products = await prisma.product.findMany({
      orderBy: {id: "desc"},
    });


    return (
      <main className={styles.homePage}>
        {products.map(e => (
          <ProductCard product={e} key={e.id}></ProductCard>
        ))}
      </main>
    );
}
