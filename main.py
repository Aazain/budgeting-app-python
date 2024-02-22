import random
import uuid

class User: 
    def __init__(self, first_name, middle_name="", last_name="", username="", password=""):
        self.first_name = first_name
        self.middle_name = middle_name
        self.last_name = last_name
        self.username = username
        self.password = password

class BudgetApp:
    def __init__(self):
        self.users = []

    def run (self):
        while True:
            print("1. Login")
            print("2. Sign Up")
            choice = input("Enter your choice: ")

            if choice == "1":
                self.login()
            elif choice == "2":
                self.signup()
            else:
                print("Invalid choice. Please try again.")

    def login(self):
        username = input("Enter Username: ")
        password = input("Enter password: ")

        for user in self.users:
            if user.username == username and user.password == password:
                print("Login successful!")
                # Add logged-in user functionality here (e.g., access budgets)
                # You can implement a separate function for this
                return  # Exit login function after successful login
        print("Invalid credentials. Please try again.")

    def signup(self):
        first_name = input("Enter First Name: ")
        middle_name = input("Enter Middle Name (Optional): ") or None
        last_name = input("Enter Last Name: ")

        # Generate unique username
        username_base = first_name.lower()
        while True:
            random_numbers = str(random.randint(10, 99))
            username = username_base + random_numbers
            if not any(user.username == username for user in self.users):
                break

        # Set password (implement appropriate logic and security measures)
        password = input("Set your password: ")

        user = User(first_name, middle_name, last_name, username, password)
        self.users.append(user)
        print("Signup successful! Your username is", username)

if __name__ == "__main__":
    app = BudgetApp()
    app.run()