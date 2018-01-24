FROM nikolaik/python-nodejs:latest

COPY . /root

WORKDIR /root

RUN rm -rf node_modules && \
    rm -rf upload/*.jpg && \
    npm i --production

EXPOSE 5000

VOLUME /upload

CMD ["node", "server.js"]
