"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar/Sidebar"
import { getBudget } from "@/services/budget.service"
import { HistoryChart } from "@/components/historyChart/HistoryChart"
import { HistoryList } from "@/components/historyList/HistoryList"
import { FinanceCard } from "@/components/financeCard/FinanceCard"
import { useEffect } from "react";
import { redirect } from "next/router"
import { useRouter } from 'next/navigation';


const Dashboard = () => {
    const [isLoading, setLoading] = useState(true)
    const [budget, setBudget] = useState(null)
    const router = useRouter();
    
    const date = new Date()
    const fetchBudget = async () => {
        const res = await getBudget(date.getFullYear(), date.getMonth()+1, date.getDate());   
        if(res.status == 401){
            router.push('/auth');
            return;
        }
        
        setBudget(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchBudget()
    },[])

    if (isLoading){
        return (<h1>Loading</h1>)
    }
    return(
        <div className="grid gap-4 md:p-4 md:show md:grid-cols-[200px,_1fr] round-lg">
            <Sidebar/>
            <div className="p-4 rounded-2xl m-2">
                <div>
                    <div className="grid md:grid-cols-3 gap-2 md-grid-cols-2">
                        {/* need the following cards: months income, months expenses, cashflow */}
                        {/* history line graph */}
                        {/* transaction history */}
                        <FinanceCard title='Income' amount='25,232' type='positive' />
                        <FinanceCard title='Expenses' amount='25,21' type='negative'/>
                        <FinanceCard title='CashFlow' amount='250,32' type={`${0}`} />
                    </div>

                    <div className="mt-2">
                        <HistoryChart/>
                    </div>
                    
                    <div className="mt-2">
                        <HistoryList transactionData={budget}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard