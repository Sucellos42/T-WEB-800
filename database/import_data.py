# import mariadb
# import json
# import os

# # Connect to the database
# conn = mariadb.connect(
#     user="user",
#     password="user",
#     host="10.18.205.115",
#     port=3306,
#     database="db_web"
# )

# # Create a cursor
# cursor = conn.cursor()

# # Define the path to the folder containing the JSON files
# folder_path = 'extracted_files/objects/f'

# # Iterate over all subdirectories and files in the folder
# for root, dirs, files in os.walk(folder_path):
#     for filename in files:
#         if filename.endswith('.json'):
#             # Load the JSON data
#             with open(os.path.join(root, filename), 'r', encoding='utf-8') as f:
#                 data = json.load(f)

#                 event_type_str = str(data["@type"])

#                 # Remove unwanted characters and split into list
#                 event_type_list = event_type_str.replace("['", "").replace("']", "").strip().split(', ')

#                 # Join list elements into string separated by commas
#                 event_type_str = ', '.join(event_type_list)

#                 # Truncate string to 255 characters
#                 event_type_str = event_type_str[:255]

#                 # Extract address data
#                 address_data = data.get("hasBeenCreatedBy", {}).get("schema:address", [])
#                 address = None
#                 city = None
#                 for addr in address_data:
#                     if "schema:streetAddress" in addr and "schema:addressLocality" in addr:
#                         address = addr["schema:streetAddress"][0].replace("['", "").replace("']", "")
#                         city = addr["schema:addressLocality"]
#                         break

#                 # Extract label
#                 label = data.get("rdfs:label", {}).get("fr", [])
#                 if label:
#                     label = label[0]
#                 else:
#                     label = None

#                 # Extract description
#                 description = 'Pas de description disponible'
#                 if "hasDescription" in data:
#                     for desc in data["hasDescription"]:
#                         if "dc:description" in desc and "fr" in desc["dc:description"]:
#                             description = desc["dc:description"]["fr"][0]
#                             break
                
#                 latitude = None
#                 longitude = None
#                 if "isLocatedAt" in data and isinstance(data["isLocatedAt"], list) and len(data["isLocatedAt"]) > 0:
#                     location = data["isLocatedAt"][0]
#                     if "schema:geo" in location and isinstance(location["schema:geo"], dict):
#                         geo = location["schema:geo"]
#                         if "schema:latitude" in geo:
#                             latitude = geo["schema:latitude"]
#                         if "schema:longitude" in geo:
#                             longitude = geo["schema:longitude"]

#                 # Check if values are not null
#                 if description is not None and address is not None and city is not None and latitude is not None and longitude is not None:
#                     # Insert the data into the database
#                     cursor.execute("""
#                         INSERT INTO events_by_address (identifier, label, description, address, city, event_type, longitude, latitude)
#                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
#                     """, (
#                         data["dc:identifier"],
#                         label,
#                         description,
#                         address,
#                         city,
#                         event_type_str,
#                         longitude,
#                         latitude
#                     ))

# # Commit the transaction
# conn.commit()

# # Close the cursor and the connection
# cursor.close()
# conn.close()

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
