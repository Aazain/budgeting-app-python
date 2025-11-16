import { Transaction } from "@/components/Transaction"
import { getBudget } from "@/services/budget.service"

const Dashboard = () => {

    getBudget();
    return(
        <div>
            <h1>home</h1>
            <Transaction/>
        </div>
    )
}

export default Dashboard