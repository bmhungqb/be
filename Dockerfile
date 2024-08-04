FROM node:18-alpine

WORKDIR /bhtcnpm/rainy-words-adventure-be

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

COPY . .

RUN npm run build-src

CMD [ "npm", "run","build" ]

# docker build --tag node-docker .
# docker run -p 8080:8080 -d node-docker