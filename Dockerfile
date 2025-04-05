FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173
EXPOSE 5000

RUN npm install -g concurrently

CMD concurrently "npm run dev" "node server.js"