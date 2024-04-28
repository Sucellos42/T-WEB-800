#!/bin/bash

CONTAINER_NAME="mariadb"

# Docker compose
docker-compose up -d --build


# Attendre que MariaDB soit prêt (remplacer 30 par le nombre de secondes approprié)
echo "Attente que MariaDB soit opérationnel..."
sleep 5

# Charger les variables d'environnement depuis le fichier .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Vérifier si la base de données existe
# shellcheck disable=SC2086
if docker exec -i $CONTAINER_NAME mariadb -u $MYSQL_USER -p"$MYSQL_PASSWORD" -e "use $MYSQL_DATABASE" 2> /dev/null; then
    echo "La base de données existe déjà."
else
    echo "La base de données n'existe pas. Création de la base de données..."
    docker exec -i $CONTAINER_NAME mariadb -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "create database $MYSQL_DATABASE"
fi

## Restaurer la base de données
docker exec -i $CONTAINER_NAME mariadb -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" db_web < ./docker/mariadb/dump.sql

