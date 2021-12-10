FROM node:14-buster-slim
RUN apt-get update &&\
  apt-get install -y curl gosu wget sudo

# using ifconfig
ARG LOCAL_IP=192.168.1.116

ARG GITHUB_TOKEN=production
ENV GITHUB_TOKEN=${GITHUB_TOKEN}
ARG PIPEDRIVE_TOKEN=production
ENV PIPEDRIVE_TOKEN=${PIPEDRIVE_TOKEN}
ARG MONGO_PRODUCTION="mongodb://admin:dev-pipedrive@${LOCAL_IP}:27017/gist_grapper?authSource=admin"
ENV MONGO_PRODUCTION=${MONGO_PRODUCTION}
ARG AMQP_PASSWORD=guest
ENV RABBITMQ_PASSWORD=${AMQP_PASSWORD}
ARG AMQP_USERNAME=guest
ENV RABBITMQ_USERNAME=${AMQP_USERNAME}
ARG RABBITMQ_VHOST=V_pipedrive
ENV RABBITMQ_VHOST=${RABBITMQ_VHOST}
ARG RABBITMQ_HOST=${LOCAL_IP}
ENV RABBITMQ_HOST=${RABBITMQ_HOST}

RUN mkdir /etc/prometheus
RUN mkdir /var/lib/prometheus
RUN wget https://github.com/prometheus/prometheus/releases/download/v2.0.0/prometheus-2.0.0.linux-amd64.tar.gz
RUN echo ls -la
RUN tar xvf prometheus-2.0.0.linux-amd64.tar.gz
RUN cp prometheus-2.0.0.linux-amd64/prometheus /usr/local/bin/
RUN cp prometheus-2.0.0.linux-amd64/promtool /usr/local/bin/
COPY bin/prometheus.yml /etc/prometheus/
RUN cp -r prometheus-2.0.0.linux-amd64/consoles /etc/prometheus
RUN cp -r prometheus-2.0.0.linux-amd64/console_libraries /etc/prometheus

RUN touch /tmp/prometheus
RUN chown node:node -R /tmp/prometheus /etc/prometheus /var/lib/prometheus

USER node
RUN mkdir -p /home/node/app /etc/prometheus
WORKDIR /home/node/app
COPY --chown=node package*.json ./
RUN npm ci
COPY --chown=node . .
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE ${PORT}

COPY --chown=node boot.sh /usr/local/bin/start-script
RUN chmod +x /usr/local/bin/start-script

CMD [ "start-script" ]
