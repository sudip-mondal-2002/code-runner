FROM node:18-alpine

WORKDIR /app

RUN apk add --update --no-cache g++
RUN apk add --update --no-cache python3

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

