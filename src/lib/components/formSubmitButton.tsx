"use client"

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

/* button de remise de formulaire, il affiche une confirmation d'envoie lorsqu'il est cliqué

Composant côté client
*/

type FormSubmitButtonProps = {
     children: React.ReactNode,
     className?: string,
} & ComponentProps<"button">

export default function FormSubmitButton( {children, className, ...props} : FormSubmitButtonProps){
    const { pending } = useFormStatus();

    return(
        <div>
            <button 
                {...props}
                className={`${className}`} 
                type="submit" 
                disabled={pending}> 
                {pending && <span> o </span>}
                {children} 
            </button>
            <p> {pending && <span>Le produit a été envoyé</span>} </p>
        </div>
    )
}