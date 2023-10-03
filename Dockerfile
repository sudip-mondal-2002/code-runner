FROM node:18-alpine

WORKDIR /app

RUN apk add --update --no-cache g++
RUN apk add --update --no-cache python3
RUN apk add --update --no-cache gcc
RUN apk add --update --no-cache openjdk17

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

#RUN npm run build
#
#CMD ["npm", "start"]
RUN npm run generate
CMD ["npm", "run", "dev"]

