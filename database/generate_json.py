import mariadb
import json
from decimal import Decimal

# Connect to the database
conn = mariadb.connect(
    user="user",
    password="user",
    host="10.18.205.115",
    port=3306,
    database="db_web"
)

# Create a cursor
cursor = conn.cursor()

# Define the query to select 50 events in Paris
query = """
SELECT *
FROM events_by_address
WHERE city = 'Troyes'
LIMIT 50
"""

# Execute the query
cursor.execute(query)

# Fetch the results
rows = cursor.fetchall()

# Define a custom JSON encoder to handle Decimal objects
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        super(DecimalEncoder, self).default(o)

# Convert the results to JSON
json_data = json.dumps(rows, cls=DecimalEncoder)

# Write the JSON data to a file
with open('events_troyes.json', 'w') as f:
    f.write(json_data)

# Close the cursor and the connection
cursor.close()
conn.close()
