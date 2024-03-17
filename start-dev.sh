#!/bin/bash

# Naviguer au répertoire contenant le docker-compose.yml si nécessaire
# cd /chemin/vers/votre/projet

echo "Démarrage des conteneurs pour l'environnement de développement..."
docker-compose up -d --build
