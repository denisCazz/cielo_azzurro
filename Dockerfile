# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first for better layer caching.
COPY package*.json ./
RUN npm ci

# Copy source and build static site.
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner

# Copy Astro static output to nginx web root.
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Keep nginx in foreground.
CMD ["nginx", "-g", "daemon off;"]
