import mariadb
import json
import os

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

# Define the path to the folder containing the JSON files
folder_path = 'extracted_files/objects/6/69'

# Iterate over all subdirectories and files in the folder
for root, dirs, files in os.walk(folder_path):
    for filename in files:
        if filename.endswith('.json'):
            # Load the JSON data
            with open(os.path.join(root, filename), 'r', encoding='utf-8') as f:
                data = json.load(f)

                # Get the event ID
                event_id = data["dc:identifier"]

                # Get the latitude and longitude values
                latitude = None
                longitude = None
                if "isLocatedAt" in data:
                    is_located_at = data["isLocatedAt"][0]
                    if "schema:geo" in is_located_at:
                        schema_geo = is_located_at["schema:geo"]
                        if "schema:latitude" in schema_geo:
                            latitude = schema_geo["schema:latitude"]
                        if "schema:longitude" in schema_geo:
                            longitude = schema_geo["schema:longitude"]
                
                # print(event_id, latitude, longitude)

                # Update the latitude and longitude columns in the events_by_address table
                if latitude is not None and longitude is not None:
                    cursor.execute("""
                        UPDATE events_by_address
                        SET latitude = %s, longitude = %s
                        WHERE identifier = %s
                    """, (latitude, longitude, event_id))

# Commit the transaction
conn.commit()

# Close the cursor and the connection
cursor.close()
conn.close()
