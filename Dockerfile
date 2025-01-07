# Étape 1 : Build de l'application
FROM node:18 AS builder

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --omit=dev

# Copier le reste des fichiers
COPY . .

# Construire l'application Next.js
RUN npm run build

# Installer uniquement les dépendances de production
RUN npm prune --production

# Étape 2 : Serveur de production
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

# Exposer le port pour Next.js
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start"]
