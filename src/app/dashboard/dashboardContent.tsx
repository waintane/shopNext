type user = {
    user:{name?: string | null | undefined,
        email?:string | null | undefined,
        status?:string | null | undefined}
}

export default function DashboardContent({user}:user){
    return(
        <div>
            <h2>Dashboard Page</h2>
            <p>Hi {user?.name} </p>
        </div>
    )
}