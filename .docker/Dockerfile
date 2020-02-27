FROM node AS build

WORKDIR /app
COPY .. .

RUN npm install && npm run build

FROM nginx:stable
COPY --from=build /app/dist/ebad-front/ /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx -g 'daemon off;'"]


