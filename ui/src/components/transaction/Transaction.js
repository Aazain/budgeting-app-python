import { handleTransaction } from "@/services/budget.service"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import "./transaction.css"



export const Transaction = () => {
    const [date, setDate] = useState(null);
    const [amount, setAmount] = useState(0)
    const [transactionType, setTransactionType] = useState('income')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setDate(new Date());
    }, []);    

    const submit = (e) => {
        e.preventDefault();
        const year=date.getFullYear()
        const month=date.getMonth()+1
        const day=date.getDate()
        console.log(transactionType, year, month, day, amount)
        handleTransaction(transactionType, year, month, day, amount)

        setDate(new Date())
        setAmount(0)
        setTransactionType('income')
        setOpen(false)
    }

    return(
        <div>
            <button onClick={() => setOpen(true)} className="bg-[#780000] pl-4 pr-4 pt-2 pb-2 rounded-full text-white text-strong font-bold"> New Transaction </button>
            <Dialog open={open} onClose={setOpen}>
                <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                        
                        className="relative transform overflow-hidden rounded-lg bg-gray-300 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <form onSubmit={submit}>
                                <div className='flex'>
                                    <div className='p-2'>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            className="rounded-md border shadow-sm"
                                        />
                                    </div>    
                                    <div className='p-2'>
                                        <ul className="select-none grid w-full gap-4 lg:grid-cols-2">
                                            <li>
                                                <input type="radio" name="transaction-type" id="income-option" value="income" className="hidden peer" required="" defaultChecked onChange={(e) => {setTransactionType(e.target.value)}} />
                                                <label htmlFor="income-option" className="block p4 border rounded-lg text-center cursor-pointer hover:bg-green-200 peer-checked:bg-green-500 peer-checked:hover:bg-green-600">                           
                                                    <div className="w-full font-medium mb-1">Income</div>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="transaction-type" id="expense-option" value="expense" className="hidden peer" required="" onChange={(e) => {setTransactionType(e.target.value)}} />
                                                <label htmlFor="expense-option" className="block p4 border rounded-lg text-center cursor-pointer hover:bg-red-200 peer-checked:bg-red-500 peer-checked:hover:bg-red-600">                           
                                                    <div className="w-full font-medium mb-1">Expense</div>
                                                </label>
                                            </li>
                                        </ul>

                                        <div>
                                            <label htmlFor="amount" className="block text-lg/6 font-medium text-black">
                                                Amount
                                            </label>
                                            <input
                                                id="amount"
                                                name="amount"
                                                type="text"
                                                placeholder="0.00"
                                                className="block min-w-0 grow bg-gray-200 py-1.5 pr-3 pl-1 text-base text-black placeholder:text-gray-800 focus:outline-none sm:text-sm/6 rounded-lg"
                                                onChange={(e) => {setAmount(e.target.value)}}
                                            />
                                        </div>

                                        <div>
                                            <Button type='button' onClick={() => {setOpen(false)}}>Cancel</Button>
                                            <Button>Add Record</Button>
                                        </div>
                                        
                                    </div>   
                                </div>          
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}