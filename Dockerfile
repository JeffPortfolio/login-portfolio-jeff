FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /user/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci --only=production

COPY --from=development /usr/src/app/build ./build

EXPOSE 8080

CMD ["node", "build/server.js"]