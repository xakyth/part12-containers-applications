FROM node:20
WORKDIR /usr/src/my-app/backend
COPY --chown=node:node . .
RUN npm ci --omit=dev
USER node
CMD ["npm", "run", "start"]