import { Transaction } from "@/components/transaction/Transaction"

export const HistoryList = () => {
    return(
        <div class="relative flex flex-col bg-white shadow-sm rounded-lg p-8 h-[32vh]">
            <h1>TransactionList</h1>
            <Transaction/>
        </div>
    )
}