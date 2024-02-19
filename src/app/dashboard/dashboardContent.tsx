type user = {
    user:{name?: string | null | undefined,
        email?:string | null | undefined,
        status?:string | null | undefined}
}

export default function DashboardContent({user}:user){
    return(
        <div>
            <h2>Tableau de bord</h2>
            <p>Bonjour {user?.name} </p>
        </div>
    )
}