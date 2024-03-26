FROM node:16
WORKDIR /usr/src/todo-app/todo-frontend
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
COPY . .
RUN npm install
CMD ["npm", "run", "start", "--", "--host"]