FROM node:16 as build-stage
WORKDIR /usr/src/todo-app/todo-frontend
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
COPY . .
RUN npm ci
RUN npm run build

FROM build-stage as test-stage
ENV CI=true
RUN npm test

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/todo-app/todo-frontend/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf