FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Replace localhost API URL with relative /api for production (proxied by nginx)
RUN sed -i "s|http://localhost:1337/api|/api|g" src/app/services/strapi.service.ts src/app/auth/auth.service.ts
RUN sed -i "s|localhost:1337|/api|g" src/app/auth/auth.interceptor.ts

RUN npx ng build --configuration production

# --- Production ---
FROM nginx:alpine

COPY --from=build /app/dist/jeunes-en-action-dafort /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
