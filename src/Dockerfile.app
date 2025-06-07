FROM node:20-alpine AS builder

WORKDIR /app

COPY . . 

RUN npm install

EXPOSE 4000

CMD [ "npm", "start" ]