import { handleTransaction } from "@/services/budget.service"
import { useState, useEffect } from "react"
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

    return(
        <div>
            <button onClick={() => setOpen(true)}> New Transaction </button>
            <Dialog open={open} onClose={setOpen}>
                <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-gray-300 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <form onSubmit={() => {handleTransaction(transactionType, amount, date)}}>
                                <div className='flex'>
                                    <div className='p-2'>
                                        {date && (
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                value={date}
                                                onSelect={setDate}
                                                className="rounded-md border shadow-sm pointer-events-auto"
                                                captionLayout="dropdown"
                                            />
                                        )}   
                                    </div>    
                                    <div className='p-2'>
                                        <ul className="select-none grid w-full gap-4 lg:grid-cols-2">
                                            <li>
                                                <input type="radio" id="income-option" value="income" className="hidden peer" required="" onClick={(e) => {setTransactionType(e.target.value)}} />
                                                <label htmlFor="income-option" className="inline-flex items-center justify-between w-full p-5 text-body bg-green-300 border-1 border-default rounded-lg rounded-base cursor-pointer peer-checked:hover:bg-brand-softer peer-checked:border-brand-subtle peer-checked:bg-brand-softer hover:bg-neutral-secondary-medium peer-checked:text-fg-brand-strong">                           
                                                    <div className="block">
                                                        <div className="w-full font-medium mb-1">Income</div>
                                                    </div>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="expense-option" value="expense" className="hidden peer" required="" onClick={(e) => {setTransactionType(e.target.value)}} />
                                                <label htmlFor="expense-option" className="inline-flex items-center justify-between w-full p-5 text-body bg-red-300 border-1 border-default rounded-lg rounded-base cursor-pointer peer-checked:hover:bg-brand-softer peer-checked:border-brand-subtle peer-checked:bg-brand-softer hover:bg-neutral-secondary-medium peer-checked:text-fg-brand-strong">                           
                                                    <div className="block">
                                                        <div className="w-full font-medium mb-1">Expense</div>
                                                    </div>
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