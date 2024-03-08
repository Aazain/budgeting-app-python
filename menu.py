from collections import defaultdict
from database import insert_budget, get_budget_by_user_id


def manage_budget(user_id):
    while True:
        print("\n1. Add Monthly Income")
        print("2. Add Expenses")
        print("3. View Budget")
        print("4. Back to Main Menu")

        choice = input("Enter your choice: ")

        if choice == "1":
            income = float(input("Enter income amount: "))
            insert_budget(user_id, income, 0, "Income")
            print("Income added successfully!")
        elif choice == "2":
            expenses = float(input("Enter expenses amount: "))
            print("Choose a category:")
            print("1. Gas")
            print("2. Rent")
            print("3. Food")
            print("4. Water")
            print("5. Electricity")
            print("6. Add a custom category")

            category_choice = input("Enter the category number: ")
            categories = ["Gas", "Rent", "Food", "Water", "Electricity"]

            if category_choice == "6":
                category = input("Enter custom category: ")
                if not category:
                    print("Invalid category name.")
                    continue
            elif category_choice.isdigit() and 1 <= int(category_choice) <= 5:
                category = categories[int(category_choice) - 1]
            else:
                print("Invalid category choice.")
                continue

            insert_budget(user_id, 0, expenses, category)
            print("Expenses added successfully!")

        elif choice == "3":
            budget = get_budget_by_user_id(user_id)
            print("\nBudget details:")
            
            total_income = 0
            total_expenses = 0
            category_expenses = defaultdict(float)

            for row in budget:
                total_income += row[2]
                total_expenses += row[3]
                category_expenses[row[4]] += float(row[3])

            print(f"Total Income: {total_income}")
            print(f"Total Expenses: {total_expenses}")

            for category, expenses in category_expenses.items():
                if category == "Income":
                    continue
                print(f"{category}: {expenses}")

        elif choice == "4":
            break
        else:
            print("Invalid choice. Please try again.")