"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar/Sidebar"
import { getBudget } from "@/services/budget.service"
import { HistoryChart } from "@/components/historyChart/HistoryChart"
import { HistoryList } from "@/components/historyList/HistoryList"
import { FinanceCard } from "@/components/financeCard/FinanceCard"
import { useEffect } from "react";

const Dashboard = () => {
    const [budget, setBudget] = useState(null)

    useEffect(() => {
        const date = new Date()
        const fetchBudget = async () => {
            const res = await getBudget(date.getFullYear(), date.getMonth()+1, date.getDate());  
            
            setBudget(res)
        }
        
        fetchBudget()
        console.log(budget)
    },[])

    return(
        <div className="grid gap-4 p-4 grid-cols-[200px,_1fr] round-lg">
            <Sidebar/>
            <div className="p-4 rounded-2xl">
                <div>
                    <div className="grid grid-cols-3 gap-2 m-2">
                        {/* need the following cards: months income, months expenses, cashflow */}
                        {/* history line graph */}
                        {/* transaction history */}
                        <FinanceCard title='Income' amount='25,232' type='positive' />
                        <FinanceCard title='Expenses' amount='25,21' type='negative'/>
                        <FinanceCard title='CashFlow' amount='250,32' type={`${0}`} />
                    </div>

                    <div className="m-2">
                        <HistoryChart/>
                    </div>
                    
                    <div className="m-2">
                        <HistoryList/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard