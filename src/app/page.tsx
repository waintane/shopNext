import Link from "next/link";
import Header from "@/lib/components/header";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/lib/components/productCard";
import styles from "../style/components/homePage.module.scss";
import banniere from "../img/banniere.png";
import Title from "@/lib/components/title";
import BannerPoint from "@/lib/components/bannerPoint";

export default async function Home() {
    const products = await prisma.product.findMany({
      orderBy: {id: "desc"},
    });


    return (
      <main className={styles.homePage}>
        <div className={styles.banniere}>
          <div className={styles.visuel}>
            <div><img src={banniere.src} alt="" /></div>
          </div>
          <div className={styles.sousBanniere}>
            <p>Livraison rapide</p>
            <p>Livraison rapide</p>
            <p>Livraison rapide</p>
          </div>
        </div>

        <div className={styles.accueilMsg}>
          <h3>Nos prix sont imbatable</h3>
        </div>

        <Title>NOS MANTEAUX</Title>
        <section className={styles.itemSection}>
          {products.map(e => (
            <ProductCard product={e} key={e.id}></ProductCard>
          ))}
        </section>
        <BannerPoint></BannerPoint>
      </main>
    );
}
