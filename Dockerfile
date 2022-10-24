###################################################
#                      Build                      #
###################################################
FROM node:16.18.0-bullseye-slim as build

# Build under unprivileged user
USER node

# Build in the temporary directory
WORKDIR /tmp

# Copy Node dependency lists
COPY --chown=node package.json package-lock.json .

# Install Node dependencies
RUN npm ci

# Copy Prisma schemas
COPY --chown=node prisma/ prisma/

# Setup Prisma
RUN npx prisma generate

# Copy remaining sources
COPY --chown=node . .

# Run the build task
RUN npm run build

# Delete unused development dependencies
RUN npm prune --production

###################################################
#                      Deploy                     #
###################################################
FROM node:16.18.0-bullseye-slim

# Run in production
ENV NODE_ENV=production

# Run under unprivileged user
USER node

# Application directory
ARG APP_PATH="/usr/local/stock-app"
WORKDIR ${APP_PATH}

# Copy only necessary application files
COPY --from=build --chown=node /tmp/package.json /tmp/tsconfig.json .
COPY --from=build --chown=node /tmp/node_modules/ node_modules/
COPY --from=build --chown=node /tmp/dist/ dist/
COPY --from=build --chown=node /tmp/.vite/ .vite/

# Run Node server
CMD ["node", "dist/main"]
EXPOSE 3000