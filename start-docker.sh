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

exec_query() {
    docker exec -i "$CONTAINER_NAME" mariadb -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "$1" 2> /dev/null
}

# Vérifier si la base de données existe
if exec_query "use $MYSQL_DATABASE"; then
    echo "La base de données existe déjà."
else
    echo "Création de la base de données..."
    exec_query "create database $MYSQL_DATABASE"
fi

# Restaurer la base de données si nécessaire
if exec_query "use $MYSQL_DATABASE; show tables like 'events_by_address'"; then
    echo "La base de données a déjà été restaurée."
else
    echo "Restauration de la base de données..."
    docker exec -i "$CONTAINER_NAME" mariadb -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" db_web < ./docker/mariadb/dump.sql
fi

# Lancer les services si ils ne sont pas déjà lancés
services=("back-client" "back-events" "front")
for service in "${services[@]}"; do
    if ! docker ps --filter name="$service" --filter status=running | grep -q "$service"; then
        echo "Lancement du service $service..."
        docker-compose up -d --build "$service"
    else
        echo "Le service $service est déjà lancé."
    fi
done
