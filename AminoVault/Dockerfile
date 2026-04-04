# Build stage
FROM node:22-alpine AS build

# Important: Set working directory to where your actual code lives
WORKDIR /app

# Copy package files first for caching
COPY AminoVault/package*.json ./

# Install dependencies
RUN npm ci --include=dev

# Copy the entire source code (including src/assets)
COPY AminoVault/. .

# Build the React app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config for React SPA (client-side routing)
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets (including your .webp images)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
