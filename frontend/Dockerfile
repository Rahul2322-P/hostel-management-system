# Multi-stage Dockerfile for React + Vite Frontend
# Stage 1: Build React static assets
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source and build production bundle
COPY . .
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Copy built production assets to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for SPA routing and API reverse proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
