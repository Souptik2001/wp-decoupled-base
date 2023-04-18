FROM node:16

WORKDIR /app

COPY . .

RUN mv docker.env .env

# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# RUN nvm install

# RUN nvm use

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "start" ]
