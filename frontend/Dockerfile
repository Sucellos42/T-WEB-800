FROM node:21-slim AS base
# Définir l'emplacement de PNPM et l'ajouter au PATH
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Activer corepack pour utiliser pnpm
RUN corepack enable

FROM base AS dev
WORKDIR /app/frontend

# Définir l'environnement de développement
ENV NODE_ENV=development

RUN chown -R node:node /app/frontend

COPY package.json ./

RUN touch hello.txt

# Installer les dépendances
RUN pnpm install

# Copier le code source et attribuer la propriété à l'utilisateur node
COPY --chown=node:node . .

# Utiliser l'utilisateur non-root
USER node

