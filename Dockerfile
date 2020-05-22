FROM node
MAINTAINER Bruno Augusto
WORKDIR /usr/api
COPY . /usr/api
RUN npm install
ENTRYPOINT npm start
EXPOSE 3000
