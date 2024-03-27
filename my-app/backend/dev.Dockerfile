FROM node:20
WORKDIR /usr/src/my-app/backend
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]