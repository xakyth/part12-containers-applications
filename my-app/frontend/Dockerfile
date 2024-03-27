FROM node:20 as build-stage
WORKDIR /usr/src/my-app/frontend
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.25.3-alpine
COPY --from=build-stage /usr/src/my-app/frontend/dist /usr/share/nginx/html