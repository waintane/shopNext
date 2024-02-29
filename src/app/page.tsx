import Link from "next/link";
import Header from "@/lib/components/header";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/lib/components/productCard";
import styles from "../style/components/homePage.module.scss";
import banniere from "../img/banniere.png";
import Title from "@/lib/components/title";
import BannerPoint from "@/lib/components/bannerPoint";
import manteauHomme from "../img/ManteauHomme.jpg";
import manteauFemme from "../img/ManteauFemme.jpg";
import { cookies } from "next/headers";
import Carousel from "@/lib/components/carousel";

export default async function Home() {
    const products = await prisma.product.findMany({
      orderBy: {id: "desc"},
    });

    let itemWatched = await cookies().get("lastWatched");
    let visitedProduct:any =[];
    if(itemWatched){
        let array = JSON.parse(itemWatched?.value!);

        if(!Array.isArray(array)){
          array = JSON.parse(array);
        }
        
        for(let i=0; i<array.length; i++){
            const product = await prisma.product.findUnique({
                where : {id : array[i].id}
            });
            visitedProduct.push(product);
        }
    }

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

        <div className={styles.showcase}>
          <div className={styles.division}>
            <Link href={"/sexPage?sex=femme&category=manteau"} className={styles.containerShowcase}>
              <img src={manteauFemme.src} alt="manteau pour femme" />
              <h3>MANTEAU POUR FEMME</h3>
              <button>FEMME</button>
            </Link>
            <Link href={"/sexPage?sex=homme&category=manteau"} className={styles.containerShowcase}>
              <img src={manteauHomme.src} alt="manteau pour homme" />
              <h3>MANTEAU POUR HOMME</h3>
              <button>HOMME</button>
            </Link>
          </div>
        </div>

        <Title>RECEMENT VISITÉ</Title>

        <section>
          <div>
            <Carousel products={visitedProduct}></Carousel>
          </div>
        </section>

        <Title>AUTRE</Title>

        <section className={styles.itemSection}>
          {products.map(e => (
            <ProductCard product={e} key={e.id}></ProductCard>
          ))}
        </section>
        <BannerPoint></BannerPoint>
      </main>
    );
}
