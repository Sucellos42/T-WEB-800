# Utiliser l'image officielle MariaDB comme base
FROM mariadb:latest

# Copier le fichier de dump et le script de restauration
#COPY ./dump.sql /docker-entrypoint-initdb.d/
COPY ./restore.sh /restore.sh
##
# Rendre le script exécutable
RUN chmod +x /restore.sh


## Attendre que la base de données soit prête
##HEALTHCHECK --interval=5s --timeout=3s \
##  CMD mysqladmin ping -h
