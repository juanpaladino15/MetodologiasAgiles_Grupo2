FROM node:18 

LABEL maintainer="emanuelrodriguez644@gmail.com"

WORKDIR /app

COPY ./dashboard .

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000/tcp