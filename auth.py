import random
from user import User
from database import username_exists, insert_user, get_user_by_username
from menu import manage_budget

def signup():
    first_name = input("Enter First Name: ")
    middle_name = input("Enter Middle Name (Optional): ") or None
    last_name = input("Enter Last Name: ")

    # Generate unique username
    username_base = first_name.lower()
    while True:
        random_numbers = str(random.randint(10, 99))
        username = username_base + random_numbers
        if not username_exists(username):
            break

    # Set password securely (use User.set_password from user.py)
    password = input("Set your password: ")
    user = User(first_name, middle_name, last_name, username)
    user.set_password(password)

    # Insert user data into database using database.insert_user()
    insert_user(user)
    print("Signup successful! Your username is", username)

def login():
    username = input("Enter Username: ")
    password = input("Enter password: ") 

    # Fetch user data based on username
    user = get_user_by_username(username)
    if user:
        result = user[0]
        user_id = result[0]

    if user and User.verify_password(result[5], password):  # Use User.verify_password from user.py
        print("\nLogin successful!")
        manage_budget(user_id)
    else:
        print("Invalid credentials. Please try again.\n")
        login()
