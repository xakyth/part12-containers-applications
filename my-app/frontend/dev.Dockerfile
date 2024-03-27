FROM node:20
WORKDIR /usr/src/my-app/frontend
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]