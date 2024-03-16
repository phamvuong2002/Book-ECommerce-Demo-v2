import mysql.connector.pooling

def initialize_connection_pool():
    try:
        connection_pool = mysql.connector.pooling.MySQLConnectionPool(
            pool_name="mypool",
            pool_size=5,
            pool_reset_session=True,
            host='localhost',
            user='root',
            password='vuong',
            database='mydb'
        )
        return connection_pool

    except mysql.connector.Error as e:
        print("Error while connecting to MySQL", e)
        return None

def get_connection(connection_pool):
    if connection_pool is None:
        initialize_connection_pool()  # Initialize the connection pool if not already initialized

    try:
        connection = connection_pool.get_connection()
        if connection:
            return connection
        else:
            print("Failed to get connection from pool.")
            return None
    except mysql.connector.Error as e:
        print("Error while getting connection from pool:", e)
        return None