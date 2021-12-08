#!/bin/sh

/usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus/data --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/consoles_libraries | tee /tmp/prometheus >/dev/null &
npm run start
