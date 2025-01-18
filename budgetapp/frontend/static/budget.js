const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

let today = new Date()
let monthName = months[today.getMonth()]
document.getElementById("selected_date").value = `${today.getFullYear()}-${(today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)}-${today.getDate()}`

let date = new Date(document.getElementById("selected_date").value  + 'T00:00:00')
let year = date.getFullYear()
let month = date.getMonth() + 1
monthName = months[date.getMonth()]
let day = date.getDate()

document.getElementById("budgetDetailsTitle").innerHTML = `Budget Details for ${monthName}`;
document.getElementById("selected_date").addEventListener("change", function() {
    date = new Date(document.getElementById("selected_date").value + 'T00:00:00') 
    document.getElementById("viewBudgetBtn").click();
})

function viewBudget(){
    console.log("working")
    year = date.getFullYear()
    month = date.getMonth() + 1
    monthName = months[date.getMonth()]
    day = date.getDate()
    document.getElementById("budgetDetailsTitle").innerHTML = ``;
    document.getElementById("budgetDetailsTitle").innerHTML += `Budget Details for ${monthName}`;
    console.log(`/get-budget?year=${year}&month=${month}&day=${day}`)
    fetch(`/get-budget?year=${year}&month=${month}&day=${day}`)
    .then(response => response.json())
    .then(data => {
        if(data.error == 'no budget set'){
            document.getElementById("budgetDetailsTitle").innerHTML = `No Income for ${monthName} Has Been set`;
            document.getElementById("budgetDetails").style.display = "none";
        }
        else{
            let incomeTotal = 0, expenseTotal = 0;
            data.forEach(budget => {
                console.log(parseFloat(budget.income))
                incomeTotal += parseFloat(budget.income)
                expenseTotal += parseFloat(budget.expenses)
            });
            console.log(incomeTotal, expenseTotal)
            document.getElementById("income").innerHTML = `Income: $${incomeTotal}`;
            document.getElementById("expenses").innerHTML = `Expenses: $${expenseTotal}`;
            var remainingBudget = incomeTotal - expenseTotal;
            document.getElementById("remaining").innerHTML = `Remaining Budget: $${remainingBudget}`;
            document.getElementById("budgetDetails").style.display = "block";
        }
    })
    .catch(error => {
            console.log(error)
    });
}


function addIncome(){
    if (month !== "") {
        document.getElementById("income_year").value = `${year}`;
        document.getElementById("income_month").value = `${month < 10 ? '0' + month : month}`;
        document.getElementById("income_date").value = `${day}`;
        document.getElementById("incomeForm").style.display = "block";
    } else {
        alert("Please select a month first.");
    }
}

function addExpense(){
    if (month !== "") {
        document.getElementById("expense_year").value = `${year}`
        document.getElementById("expense_month").value = `${month < 10 ? '0' + month : month}`;
        document.getElementById("expense_date").value = `${day}`
        document.getElementById("expensesForm").style.display = "block";
    } else {
        alert("Please select a month first.");
    }
}