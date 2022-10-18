FROM node:16

# Update package lists and system dependencies
RUN apt update && apt upgrade -y

USER node

# Application directory
WORKDIR /usr/local/stock-app/

# Copy and build Node dependencies
COPY package.json package-lock.json .
RUN npm ci

# Copy Prisma schemas and setup Prisma
COPY prisma prisma/
RUN npx prisma generate

# Copy remaining sources
COPY . .

# Run Node servers
CMD ["npm", "run", "start:fulldev"]
EXPOSE 5173 3000