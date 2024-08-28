FROM node:18.19.1

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]