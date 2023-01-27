FROM node:16.18.0-bullseye-slim

# Build under unprivileged user
USER node

# Application directory
ARG APP_PATH="/usr/local/stock-app"
WORKDIR ${APP_PATH}

# Copy Node dependency lists
COPY --chown=node package.json package-lock.json ./

# Install Node dependencies
RUN npm ci

# Copy Prisma schemas
COPY --chown=node prisma/ prisma/

# Setup Prisma
RUN npx prisma generate

# Copy remaining sources
COPY --chown=node . .

# Run Node back-end server
CMD ["npm", "run", "start:dev"]
EXPOSE 3000
