FROM node:18-alpine AS build
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY .env ./.env
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html