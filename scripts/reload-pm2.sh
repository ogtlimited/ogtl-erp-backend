#!/bin/bash

sudo -i
cd /opt/backend/
cp /home/ubuntu/.env .
sudo pm2 startOrReload ecosystem.config.js --only prod