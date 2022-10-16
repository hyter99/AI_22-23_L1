FROM node:16

# Update package lists and system dependencies
RUN apt update && apt upgrade -y

#USER node

# Application directory
WORKDIR /usr/local/stock-app/

# Copy and build Node dependencies
COPY package.json package-lock.json .
RUN npm ci

# Copy remaining sources
COPY . .

# Setup Prisma
RUN npx prisma generate

# Run Node servers
CMD ["npm", "run", "start:fulldev"]
EXPOSE 5173 3000