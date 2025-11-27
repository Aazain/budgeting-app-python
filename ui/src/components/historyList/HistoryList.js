import { Transaction } from "@/components/transaction/Transaction"
import { useEffect, useState } from "react";

export const HistoryList = (props) => {
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        setTransactionData(props.transactionData)
    },[])

    console.log(transactionData)

    const listItems = transactionData.map(data => {
       return <li key={data.id}>{data.amount}</li> 
    });

    return(
        <div className="relative flex flex-col bg-white shadow-sm rounded-lg p-8 h-[34vh]">
            <h1 className="">Recent Transactions</h1>
            <ul>
                {listItems}
            </ul>
            <Transaction/>
        </div>
    )
}