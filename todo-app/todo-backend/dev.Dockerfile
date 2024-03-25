FROM node:16
WORKDIR /usr/src/todo-app/todo-backend
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]