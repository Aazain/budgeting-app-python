from database import connect_to_db
from auth import signup, login

def main():
    """
    The main entry point for the BudgetApp.
    """

    # Connect to the database (call function from database.py)
    database = connect_to_db()

    while True:
        print("\n1. Login")
        print("2. Sign Up")
        try:
            choice = input("Enter your choice: ")
        except EOFError:
            print("\nExiting...")
            break


        if choice == "1":
            login()
        elif choice == "2":
            signup()
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
