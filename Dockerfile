FROM node:16.15.1-alpine

WORKDIR /usr/app

RUN npm install -g @nestjs/cli@8.0.0

COPY package.json yarn.lock ./

RUN yarn install

COPY src test tsconfig.json nest-cli.json tsconfig.build.json .env ./

EXPOSE 3000

CMD ["yarn": "start:dev"]
