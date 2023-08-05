FROM node:18-alpine
WORKDIR /server
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "server.js"]