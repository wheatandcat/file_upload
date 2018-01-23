FROM nikolaik/python-nodejs:latest

COPY . /root

WORKDIR /root

RUN rm -rf node_modules && \
    npm i --production

EXPOSE 5000

CMD ["node", "server.js"]
