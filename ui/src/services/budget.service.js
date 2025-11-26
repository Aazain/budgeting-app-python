import { env } from "@/config/env";
import { useEffect } from "react";
import { refresh } from "./user.service";

export const getBudget = async (year, month, day) => {
    try{
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessed token" + accessToken)

        const response = await fetch(`${env()}/get-budget?year=${year}&month=${month}&day=${day}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const result = await response.json()
        result.forEach(item => {
            console.log(item.amount);
        });
        return result
    } catch(err){
        console.log(err)
    }  
}

export const handleTransaction = async (transactionType='income', year='2025', month='22', day='23', amount='24') => {
     try{
        const accessToken = localStorage.getItem("accessToken");
        const handleTransaction = async () => {
            try{
            console.log("accessed token" + accessToken)

            const response = await fetch(`${env()}/add-transaction/`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    'year': year,
                    'month': month,
                    'day': day,
                    'amount': amount,
                    'transactionType': transactionType
                })
            })

            const result = await response.json()
            
            console.log(response)
            console.log(result)

            result.forEach(item => {
                console.log(item.income);
            });
            } catch(err){
                console.log(err)
            }
        }

        handleTransaction()
    }catch(err){
        console.log(err)
    }
}