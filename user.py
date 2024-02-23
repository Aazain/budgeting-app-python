class User:
    def __init__(self, first_name, middle_name="", last_name="", username="", password=""):
        self.first_name = first_name
        self.middle_name = middle_name
        self.last_name = last_name
        self.username = username
        self.password = password

    def set_password(self, new_password):
        # Implement secure password hashing using bcrypt with random salts
        # Replace the placeholder with your actual implementation
        self.password = new_password  # Replace with hashed password

    def verify_password(self, password):
        # Compare the entered password with the stored hashed password using bcrypt.checkpw()
        # Replace the placeholder with your actual implementation
        return self.password == password  # Replace with actual comparison
