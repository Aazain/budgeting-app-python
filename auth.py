import random
import uuid
from user import User

def signup(database):
    first_name = input("Enter First Name: ")
    middle_name = input("Enter Middle Name (Optional): ") or None
    last_name = input("Enter Last Name: ")

    # Generate unique username
    username_base = first_name.lower()
    while True:
        random_numbers = str(random.randint(10, 99))
        username = username_base + random_numbers
        if not database.username_exists(username):  # Replace with actual username check
            break

    # Set password securely (use User.set_password from user.py)
    password = input("Set your password: ")
    user = User(first_name, middle_name, last_name, username)
    user.set_password(password)

    # Insert user data into database using database.insert_user() (implement in database.py)
    database.insert_user(user)
    print("Signup successful! Your username is", username)

def login(database):
    username = input("Enter Username: ")
    password = input("Enter password: ")

    user_data = database.get_user_by_username(username)

    if user_data:
        user_password = user_data[1]
        if user_password == password:
            print("Login successful")
        else:
            print("Invalid credentials. Please try again.")
    else:
        print("Username not found.")

    # Fetch user data based on username (implement in database.py)
    user = database.get_user_by_username(username)

    if user and user.verify_password(password):  # Use User.verify_password from user.py
        print("Login successful!")
        # Implement logged-in user functionality (e.g., access budgets)
    else:
        print("Invalid credentials. Please try again.")
