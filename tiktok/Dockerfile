FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf && npm install @nestjs/mongoose && npm install moment && npm install triple-beam && npm install winston && npm install @nestjs/swagger && npm install dotenv

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]