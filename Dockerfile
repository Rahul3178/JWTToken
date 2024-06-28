# Stage 1: Build the Angular application
FROM node:lts-alpine AS build

ENV NODE_ENV=development
WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install -g @angular/cli@16.2.0 && npm install

COPY . .

RUN npm run build --prod

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/jwttoken /usr/share/nginx/html

EXPOSE 3005

CMD ["nginx", "-g", "daemon off;"]
