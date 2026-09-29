FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all source files (package.json, utils.js, test.js, server.js, public/, etc.)
COPY . .

EXPOSE 3000

# Default application start command
CMD ["npm", "start"]
