"use client";

/* Composant bouton permmettant de faire défiler le carousel de gauceh à droite
et vice versa

composant côté client
*/

import styles from "../../../style/microComponents/buttonCarousel.module.scss";

interface buttonCarouselProps{
    children: React.ReactNode,
    direction: string
}

let currentPosition:number = 0;

export default function ButtonCarousel({children, direction}: buttonCarouselProps){


    currentPosition = 0;

    function slide(direction:String){
        const carousels = document.querySelectorAll<HTMLElement>(".carousel");
        const cards = document.querySelectorAll<HTMLElement>(".carousel .productCard");
        
        const card = cards[0];
        let carousel = carousels[0];

        let dimension = card.offsetWidth;
        let dimensionCarousel = carousel.offsetWidth;

        let distanceMaxRight = dimensionCarousel;

        cards.forEach(e => {
            distanceMaxRight = distanceMaxRight - e.offsetWidth;
        });

        console.log(distanceMaxRight);

        if(direction == "right" && currentPosition < -distanceMaxRight){
            currentPosition = currentPosition + dimension;
            cards.forEach(e => {
                e.style.transform = `translateX(-${currentPosition}px)`;
            });   
        }else if(direction == "left" && currentPosition != 0){
            currentPosition = currentPosition - dimension;
            cards.forEach(e => {
                e.style.transform = `translateX(-${currentPosition}px)`;
            });   
        }
    }

    return(
        <div className={styles.buttonCarousel}>
            <button onClick={() => slide(direction)}> {children} </button>
        </div>
    )
}