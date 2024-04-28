#!/bin/bash


# Echo hello world
echo "Hello world"
# Script pour restaurer la base de données à partir d'un dump SQL


# Attendre que le serveur MariaDB soit prêt à accepter des commandes
#until echo '\q' | mariadb -u root -p"$MYSQL_ROOT_PASSWORD" -h localhsot -p 3306; do
#    >&2 echo "MariaDB is unavailable - sleeping"
#    sleep 1
#done
#>&2 echo "MariaDB is up - executing command"

## Restaurer la base de données à partir du fichier dump.sql
#mariadb -h 0.0.0.0 -P "$MYSQL_PORT" -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < /docker-entrypoint-initdb.d/dump.sql
mariadb -h 0.0.0.0 -P 3307 -u root -p
