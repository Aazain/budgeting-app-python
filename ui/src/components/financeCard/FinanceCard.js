export const FinanceCard = ({title, amount, type, children}) =>{
    return(
        <div class="relative flex flex-col bg-white shadow-sm rounded-lg p-4 h-[15vh]">
            <div class="flex justify-between">
                <p class="text-slate-700 text-md font-semibold">
                {title}
                </p>
                <span class="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">Badge</span>
                <span class="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">Badge</span>
            </div>

            <div class="flex mb-7">
                <p class={`text-3xl font-bold ${type == 'positive' ? "text-green-600" : "text-red-600"}`}>
                ${amount}
                </p>
            </div>

            <div className="absolute bottom-5">
                <a href="#" class="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                View More
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                </a>
            </div>
        </div>
    )
}