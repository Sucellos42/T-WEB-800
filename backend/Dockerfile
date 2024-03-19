# Étape de base pour tous les builds
FROM node:20-alpine AS base
# Définir l'emplacement de PNPM et l'ajouter au PATH
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Activer corepack pour utiliser pnpm
RUN corepack enable


#
# 🧑‍💻 Development
#
FROM base AS dev
WORKDIR /app/backend

RUN chown -R node:node /app/backend

# add the missing shared libraries from alpine base image
RUN apk add --no-cache libc6-compat
#RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*

# Définir l'environnement de développement
ENV NODE_ENV=development
# Créer un utilisateur non-root pour Docker (corriger la syntaxe)
RUN #groupadd --system --gid 1001 node \
#    && useradd --system --uid 1001 -g node node
# Activer le cache pnpm pour les étapes de développement
RUN --mount=type=cache,id=pnpm-store-dev,target=/pnpm/store pnpm config set store-dir /pnpm/store

# Installer les dépendances
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./app
RUN pnpm install --frozen-lockfile
# Copier le code source et attribuer la propriété à l'utilisateur node
COPY --chown=node:node . .
# Utiliser l'utilisateur non-root
USER node

#
# 🏡 Production Build
#
# Étape de build de production
FROM base AS build
WORKDIR /app
# Réutiliser le cache pnpm pour les étapes de build
RUN --mount=type=cache,id=pnpm-store-build,target=/pnpm/store pnpm config set store-dir /pnpm/store
COPY --from=dev /app/ ./
# Définir l'environnement de production
ENV NODE_ENV=production
# Générer le build de production. Ici, nous supposons que `pnpm run build` est configuré pour votre NestJS app
RUN pnpm run build
# Installer uniquement les dépendances de production et nettoyer le cache
RUN pnpm install --frozen-lockfile --prod && pnpm store prune
# Copier les fichiers nécessaires pour l'exécution
COPY . .
# Utiliser l'utilisateur non-root
USER node

#
# 🚀 Production Server
#
FROM base AS prod
WORKDIR /app
# Copier les fichiers nécessaires depuis l'étape de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
# Définir l'environnement de production (si pas déjà fait)
ENV NODE_ENV=production
# Utiliser l'utilisateur non-root
USER node
# Définir la commande pour exécuter l'application
CMD ["node", "dist/main.js"]
