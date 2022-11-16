FROM node:18 

LABEL maintainer="emanuelrodriguez644@gmail.com"

WORKDIR /app

COPY ./backendParking .

RUN npm install

CMD [ "node", "backendParking/src/index.js" ]

EXPOSE 4000/tcp