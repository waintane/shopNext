interface buttonCarouselProps{
    children: React.ReactNode,
}

export default function ButtonCarousel({children}: buttonCarouselProps){
    return(
        <div>
            <button> {children} </button>
        </div>
    )
}