FROM node:14-slim

WORKDIR /app

# COPY ./package.json ./
# COPY ./package-lock ./

RUN npm install

COPY . .

# EXPOSE 9090

CMD [ "npm","start" ]