export const InfoCard = ({title, description, children}) =>{
    return(
        <div class="relative flex flex-col m-2 bg-white shadow-lg border border-slate-400 rounded-lg p-8">
            <div class="flex items-center mb-4">
                <h5 class="ml-3 text-slate-800 text-xl font-semibold">
                {title}
                </h5>
            </div>
            <hr />
            <hr />
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