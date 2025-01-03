# Utiliser une image Node.js stable pour construire
FROM node:18 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
COPY . .

# Installer les dépendances et construire l'application
RUN npm install --legacy-peer-deps
RUN npm run build

# Phase finale : utiliser une image optimisée pour servir l'application
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers compilés depuis la phase de build
COPY --from=builder /app ./

# Exposer le port utilisé par Next.js
EXPOSE 3000

# Démarrer l'application Next.js
CMD ["npm", "start"]
