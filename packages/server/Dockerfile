FROM node:18-alpine
WORKDIR /app

RUN yarn global add typescript
RUN yarn global add vite

COPY ./package.json ./

RUN yarn install
COPY . .

CMD ["yarn", "dev"]