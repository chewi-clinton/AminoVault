# Build stage - uses modern Node
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
RUN npm ci --include=dev

# Copy all your code
COPY . .

# Build the app
RUN npm run build

# Production stage - very small & fast (nginx)
FROM nginx:alpine

# Copy the built files
COPY --from=build /app/dist /usr/share/nginx/html

# Simple config for React Router (SPA)
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
