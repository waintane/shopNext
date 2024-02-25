import { User } from "@prisma/client";
import styles from "../../style/microComponents/dashboardEntete.module.scss";

type dashboardEnteteProps = {
    children : React.ReactNode,
    user: {name?: string | null | undefined,
        email?:string | null | undefined,
        status?:string | null | undefined},
}

export default function DashboardEntete({children,user}:dashboardEnteteProps){
    return(
        <div className={styles.dashboardEntete}>
            <h2 className={styles.title}>{children}</h2>
            <div className={styles.dashboardInfo}>
                <p>Bonjour, {user?.name} </p>
                <p> {user?.status} </p>
            </div>
            <div className={styles.lineContainer}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </div>
    ) 
}