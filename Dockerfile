FROM node:14-buster-slim

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./

RUN npm ci

COPY --chown=node . .

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
RUN npm run build

EXPOSE ${PORT}

CMD [ "node", "." ]
