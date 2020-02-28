FROM node AS build

WORKDIR /app
COPY . .

COPY environment.prod.ts /app/src/environments/environment.prod.ts
RUN npm install && npm run build

FROM nginx:stable
COPY --from=build /app/dist/ebad-front/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
#CMD ["nginx -g 'daemon off;'"]


