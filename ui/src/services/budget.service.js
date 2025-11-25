import { env } from "@/config/env";
import { useEffect } from "react";
import { refresh } from "./user.service";

export const getBudget = async () => {
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const fetchBudget = async () => {
            try{
            console.log("accessed token" + accessToken)

            const response = await fetch(`${env()}/get-budget?year=21&day=23&month=22`, {
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` }
            })

            const result = await response.json()
            
            console.log('response is:' + result)
            result.forEach(item => {
                console.log(item.amount);
            });
            } catch(err){
                console.log(err)
            }
        }

        fetchBudget()
    })
}

export const handleTransaction = async (transactionType='income', year='21', month='22', day='23', amount='24') => {
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