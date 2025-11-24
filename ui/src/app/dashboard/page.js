"use client"


import { Transaction } from "@/components/transaction/Transaction"
import { getBudget } from "@/services/budget.service"
import { useEffect } from "react";

const Dashboard = () => {

    getBudget();
    return(
        <div>
            <h1>home</h1>
            <Transaction/>
        </div>
    )
}

export default Dashboard