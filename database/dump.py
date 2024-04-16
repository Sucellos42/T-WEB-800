import pandas as pd
import sqlalchemy as sa

# Créer une chaîne de connexion à la base de données
connection_string = "mysql+pymysql://user:user@10.18.205.115:3306/db_web"

# Créer un moteur SQLAlchemy à partir de la chaîne de connexion
engine = sa.create_engine(connection_string)

# Écrire une requête SQL pour sélectionner les données de la table
query = "SELECT * FROM events_by_address"

# Utiliser pandas pour exécuter la requête et stocker les résultats dans un DataFrame
df = pd.read_sql_query(query, engine)

# Spécifier le chemin d'accès absolu pour le fichier SQL
filepath = "./events_by_address.sql"

# Écrire le contenu du DataFrame dans un fichier SQL
df.to_sql('events_by_address', engine, if_exists='replace', index=False, chunksize=10000, method='multi', index_label='id')

