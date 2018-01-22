FROM node:9.4.0-alpine

COPY . /root

WORKDIR /root

RUN npm i --production

EXPOSE 5000

CMD ["node", "server.js"]
