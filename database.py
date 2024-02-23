import psycopg2

def connect_to_db():
    HOST = "localhost"
    PORT = 5432
    DATABASE = "accountinfo"
    USER = "postgres"
    PASSWORD = "0010"

    try:
        connecion = psycopg2.connect(
            host=HOST,
            port=PORT,
            database=DATABASE,
            user=USER,
            password=PASSWORD
        )
        return connecion
    except (Exception, psycopg2.Error) as error:
        print("Error connecting to PostgreSQL database:", error)
        raise

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
        elif query.lower().startswith("insert") or query.lower().startswith("update") or query.lower().startswith("delete"):
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

#Enter Username: cristiano56
#Enter password: abcd