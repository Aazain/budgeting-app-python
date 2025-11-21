import { handleTransaction } from "@/services/budget.service"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"




export const Transaction = () => {
    const [date, setDate] = useState(null);
    const [amount, setAmount] = useState(null)
    const [transactionType, setTransactionType] = useState('')

    useEffect(() => {
        setDate(new Date());
    }, []);    

    return(
        <div>
            <h1>Transaction</h1>
            <form onSubmit={handleTransaction}>
                {date && (
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border shadow-sm"
                        captionLayout="dropdown"
                    />
                )}
                <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
                
            </form>
        </div>
    )
}