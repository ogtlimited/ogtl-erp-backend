#!/bin/bash

cd /opt/backend/
cp /home/ubuntu/.env .
pm2 startOrReload ecosystem.config.js