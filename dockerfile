FROM node:12-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 

COPY --from=build /app/build /usr/share/nginx/html 