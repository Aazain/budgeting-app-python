import { env } from "@/config/env";

export const getBudget = async () => {
    try{
        const response = await fetch(`${env()}/get-budget`, {
            method: "GET",
            headers: {"user": 'test@gmail.com'}
        })

        const result = await response.json()
        console.log(result)
    } catch(err){
        console.log(err)
    }
}