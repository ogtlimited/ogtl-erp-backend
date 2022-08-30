# Common build stage
FROM ubuntu:20.04

COPY . ./app

WORKDIR /app

ENV NODE_VERSION=16.13.0

RUN apt update 

RUN apt install -y curl

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

ENV NVM_DIR=/root/.nvm

RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}

RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}

RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}

ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN node --version

RUN npm --version

RUN npm install

RUN apt install redis-server -y

EXPOSE 3000

# RUN service redis-server start

# # Development build stage
# FROM common-build-stage as development-build-stage

# ENV NODE_ENV development

# CMD ["/bin/bash", "-c", "service", "redis-server", "start";"npm", "run", "dev"]
CMD service redis-server start && npm run dev
# CMD ["sleep", "1000"]

# Production build stage
# FROM common-build-stage as production-build-stage

# ENV NODE_ENV production

# CMD ["npm", "run", "start"]
