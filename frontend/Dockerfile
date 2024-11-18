FROM node:20

WORKDIR /src/app

COPY package.json yarn.lock ./

# Install Angular CLI globally and link it to the path
RUN yarn global add @angular/cli \
    && export PATH="$(yarn global bin):$PATH"

RUN yarn install

COPY . .  

CMD ["ng", "serve", "--host", "0.0.0.0","--poll","2000"]
