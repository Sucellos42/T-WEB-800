#!/bin/bash

CONTAINER_NAME="mariadb"

# Docker compose du service mariadb

docker-compose --env-file .env.production up -d --build mariadb


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

## Restaurer la base de données si le dump n'a déjà été restauré
if docker exec -i $CONTAINER_NAME mariadb -u $MYSQL_USER -p"$MYSQL_PASSWORD" -e "use $MYSQL_DATABASE; show tables like 'events_by_address'" 2> /dev/null; then
    echo "La base de données a déjà été restaurée."
else
    echo "Restauration de la base de données..."
    docker exec -i $CONTAINER_NAME mariadb -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" db_web < ./docker/mariadb/dump.sql
fi


## Lancer le service back-client si il n'est pas déjà lancé
if docker ps | grep -q back-client; then
    echo "Le service back-client est déjà lancé."
else
    docker-compose up -d --build back-client
fi

## Lancer le service back-events si il n'est pas déjà lancé
if docker ps | grep -q back-events; then
    echo "Le service back-events est déjà lancé."
else
    docker-compose up -d --build back-events
fi
