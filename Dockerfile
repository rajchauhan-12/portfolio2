# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && \
    chmod -R 755 /app/build && \
    chown -R nginx:nginx /app/build

# Stage 2: Run
FROM nginx:alpine

# Remove default config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy build files with correct permissions
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html

# Copy custom config
COPY nginx.conf /etc/nginx/conf.d/

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
