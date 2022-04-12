#!/bin/bash

cd /home/ubuntu/ogtl-erp-backend
cp /home/ubuntu/.env .
sudo chown -R ubuntu:ubuntu ./*
pm2 startOrReload ecosystem.config.js --only prod