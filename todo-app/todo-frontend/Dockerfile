FROM node:16 as build-stage
WORKDIR /usr/src/todo-app/todo-frontend
ENV REACT_APP_BACKEND_URL=http://localhost:3000
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/todo-app/todo-frontend/build /usr/share/nginx/html

FROM build-stage as test-stage
ENV CI=true
RUN npm test