import psycopg2

def connect_to_db():
    HOST = "localhost"
    PORT = 5432 # your was 12345
    DATABASE = "postgres" # "accountinfo"
    USER = "postgres"
    PASSWORD = "0010"

    try:
        connection = psycopg2.connect(
            host=HOST,
            port=PORT,
            database=DATABASE,
            user=USER,
            password=PASSWORD
        )
        return connection
    except (Exception, psycopg2.Error) as error:
        print("Error connecting to PostgreSQL database:", error)
        raise


# This execute function needs to be cleaned up (hard to read)
def execute_query(query, params=None):
    conn = connect_to_db()
    try:
        cur = conn.cursor()
        if params:
            cur.execute(query, params)
        else:
            cur.execute(query)
        if query.lower().startswith("select"):
            result = cur.fetchall()
        elif (
            query.lower().startswith("insert")
            or query.lower().startswith("update")
            or query.lower().startswith("delete")
        ):
            conn.commit()
            result = cur.rowcount
        else:
            raise ValueError("Unsopperted query type")
        return result
    except (Exception, psycopg2.Error) as error:
        print("Error executing query:", error)
        raise
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

def get_user_by_username(username):
    query = "SELECT * FROM users WHERE username = %s"
    params = (username,)
    return execute_query(query, params)

def username_exists(username):
    query = "SELECT COUNT(*) FROM users WHERE username = %s"
    result = execute_query(query, (username,))
    return result[0][0] > 0

def insert_user(user):
    query = "INSERT INTO users (first_name, middle_name, last_name, username, password) VALUES (%s, %s, %s, %s, %s)"
    params = (user.first_name, user.middle_name, user.last_name, user.username, user.password)
    execute_query(query, params)


def insert_budget(user_id, income, expenses, category, month):
    query = "INSERT INTO budget (user_id, income, expenses, category, month) VALUES (%s, %s, %s, %s, %s)"
    params = (user_id, income, expenses, category, month)
    execute_query(query, params)
    
def get_budget_by_user_id(user_id, month):
    query = "SELECT * FROM budget WHERE user_id = %s AND month = %s"
    params = (user_id, month)
    return execute_query(query, params)


if __name__ == "__main__":
    username = input("Enter Username: ")
    user_info = get_user_by_username(username)
    print(user_info)

#Enter Username: cristiano56
#Enter password: abcd
# Enter Username: cristiano56
# Enter password: abcd
