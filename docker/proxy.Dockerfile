FROM node:18-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY src/proxy ./src

# Expose proxy port
EXPOSE 8080

# Start proxy server
CMD ["node", "src/server.js"]