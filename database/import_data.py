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

# Add a new column to the events_by_address table
cursor.execute("""
    ALTER TABLE events_by_address
    ADD COLUMN photo_url VARCHAR(255)
""")

# Define the path to the folder containing the JSON files
folder_path = 'extracted_files/objects/0'

# Iterate over all subdirectories and files in the folder
for root, dirs, files in os.walk(folder_path):
    for filename in files:
        if filename.endswith('.json'):
            # Load the JSON data
            with open(os.path.join(root, filename), 'r', encoding='utf-8') as f:
                data = json.load(f)

                # Get the event ID
                event_id = data["dc:identifier"]

                # Get the photo URL
                photo_url = None
                if "ebucore:hasPart" in data:
                    has_part = data["ebucore:hasPart"][0]
                    if "ebucore:locator" in has_part:
                        locator = has_part["ebucore:locator"]
                        if "http://" in locator or "https://" in locator:
                            photo_url = locator

                # Update the photo_url column in the events_by_address table
                if photo_url is not None:
                    cursor.execute("""
                        UPDATE events_by_address
                        SET photo_url = %s
                        WHERE identifier = %s
                    """, (photo_url, event_id))

# Commit the transaction
conn.commit()

# Close the cursor and the connection
cursor.close()
conn.close()
