#!/bin/bash

cd /home/ubuntu/ogtl-erp-backend
cp /home/ubuntu/.env .
sudo chown -R ubuntu:ubuntu ./*
sudo apt install npm -y
sudo npm install pm2 -g 
cd ./dist
pm2 startOrReload ecosystem.config.js --only prod