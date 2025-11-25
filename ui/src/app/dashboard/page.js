"use client"


import { Transaction } from "@/components/transaction/Transaction"
import { Sidebar } from "@/components/Sidebar"
import { getBudget } from "@/services/budget.service"
import { useEffect } from "react";

const Dashboard = () => {

    getBudget();
    return(
        <div className="grid gap-4 p-4 grid-cols-[300px,_1fr] round-lg ">
            <Sidebar/>
            <div className="shadow-xl p-6 bg-[#003049] shadow-gray-400 rounded-2xl">
                <div className="grid gap-4">
                    <div className="grid gap-4 p-4 grid-cols-3">
                        {/* need the following cards: months income, months expenses, cashflow */}
                        {/* history line graph */}
                        {/* transaction history */}
                        <button className="bg-red-200 shadow">test</button>
                        <button className="bg-red-200 shadow">test</button>
                        <button className="bg-red-200 shadow">test</button>
                    </div>
                    <div className="p-2 shadow bg-gray-100">
                        <Transaction/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard