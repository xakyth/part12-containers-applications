FROM node:16

WORKDIR /usr/src/todo-app/todo-backend

COPY --chown=node:node . .

RUN npm ci --omit=dev

USER node
CMD npm start