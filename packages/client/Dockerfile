FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]

# Expose the port.
EXPOSE 8080