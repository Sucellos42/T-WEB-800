#!/bin/bash

# Naviguer au répertoire contenant le docker-compose.prod.yml si nécessaire
# cd /chemin/vers/votre/projet

echo "Démarrage des conteneurs pour l'environnement de production..."
docker-compose -f docker-compose.prod.yml up -d --build
