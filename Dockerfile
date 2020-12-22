FROM node:latest

COPY ./package.json /src/package.json
RUN cd /src && npm install
COPY  ./ /src

WORKDIR /src
EXPOSE 8080

CMD ["npm", "start"]