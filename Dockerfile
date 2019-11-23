FROM node:12.13-alpine

RUN mkdir -p /src/docker

COPY . /src/docker
WORKDIR /src/docker

RUN npm install

EXPOSE $PORTAL_PORT

ENTRYPOINT ["npm", "run", "serve"]
