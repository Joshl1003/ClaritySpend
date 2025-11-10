# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
# Build static assets
RUN npm run build

# Serve with a tiny static server 
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
