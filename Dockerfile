FROM node:14-buster-slim

USER node

ARG GITHUB_TOKEN=production
ENV GITHUB_TOKEN=$GITHUB_TOKEN
ARG PIPEDRIVE_TOKEN=production
ENV PIPEDRIVE_TOKEN=$PIPEDRIVE_TOKEN

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./

RUN npm ci

COPY --chown=node . .

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE ${PORT}

CMD npm run start
