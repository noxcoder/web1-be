FROM node:latest
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app/
RUN npm install

EXPOSE 3000
CMD [ "node", "dist/index.js" ]